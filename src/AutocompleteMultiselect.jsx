import { Component, createElement } from "react";

import "./ui/AutocompleteMultiselect.css";

import { AutocompleteUI } from './components/AutocompleteUI';


export default class AutocompleteMultiselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateDate: null
        };
        this.autoCompleteKey = 0;
        this.onInputChange = this.changeInput.bind(this);
        this.onOpenDropdown = this.openDropdown.bind(this);
        this.options = [];
        this.optionsSelected = []; // Array for multiselect, otherwise object
        this.initialized = false;

        // Initialize to true to make sure data is retrieved when initializing widget
        this.refreshData = true;

        this.loading = true;
    }

    componentDidUpdate (prevProps) {
        let refreshState = false;

        // Refresh the data if the refreshAttribute has been set to true
        if(prevProps.refreshAttribute && this.props.refreshAttribute.value && !prevProps.refreshAttribute.value) {
            this.props.refreshAttribute.setValue(false);
            this.autoCompleteKey++;
            // Make sure data and state will be refreshed
            this.refreshData = true;
            refreshState = true; 
        }

        // Check if data sourse or attribute is used
        if (this.props.JSONAttribute) {
            if (this.props.JSONAttribute.status === 'available') { 
                if (this.refreshData || this.props.JSONAttribute !== prevProps.JSONAttribute) {
                    let dataParsed = [];
                    if (this.props.JSONAttribute.value && this.props.JSONAttribute.value !== '') {
                        dataParsed = JSON.parse(this.props.JSONAttribute.value);
                    }
                    let defaultValue = dataParsed.filter(option => option.default);
                    if (this.props.multiple) {
                        this.optionsSelected = defaultValue;
                    } else {
                        this.optionsSelected = defaultValue[0];
                    }
                    this.options = dataParsed;
                    
                    refreshState = true;
                    this.initialized = true;
                    this.refreshData = false;
                    // Store response in responseAttribute
                    this.props.responseAttribute.setValue(JSON.stringify(this.optionsSelected)); 
                }
                this.loading = false;
            }
        } else if (this.props.dataSourceOptions !== prevProps.dataSourceOptions) { // Check if the datasource has been loaded
            if (this.props.dataSourceOptions.status === 'available') {
                // If the items have been changed or if date needs to be refreshed, change the options
                if (this.refreshData ||
                    this.props.dataSourceOptions.items !== prevProps.dataSourceOptions.items) {
                    let warningGiven = false;
                    const multiSelect = this.props.multiple;
                    let optionsSelected = multiSelect ? [] : null;
                    let defaultSelectedString = undefined;

                    // Map the options and get the selected ones
                    this.options = this.props.dataSourceOptions.items.map(item => {
                        const optionTitle = this.props.titleAttr(item).value;
                        const option = {title: optionTitle};
                        //If key is used, add key to the option
                        if (this.props.keyAttr) {
                            option.key = this.props.keyAttr(item).value;
                        }
                        // If data needs to be refreshed, get default options
                        if (this.refreshData) {
                            // If string is not yet filled, fill with either the json or with null
                            if (defaultSelectedString === undefined) {
                                if (this.props.defaultSelectedStringAttr !== undefined) {
                                    try {
                                        defaultSelectedString = JSON.parse(this.props.defaultSelectedStringAttr.value);;
                                    } catch (e) {
                                        defaultSelectedString = [];
                                    }                                    
                                } else {
                                    // set to null to not check this for every item again
                                    defaultSelectedString = null;
                                }
                            }
                            let isItemDefaultSelected = false;
                            // Items can be set to default selected in two ways: defaultSelectedStringAttr prop or defaultSelectedAttr prop on an item. If the first option is chosen, the prop on the item is ignored.
                            if (defaultSelectedString !== null) {
                                isItemDefaultSelected = defaultSelectedString.indexOf(optionTitle) !== -1;
                            } else {
                                isItemDefaultSelected = this.props.defaultSelectedAttr && this.props.defaultSelectedAttr(item).value;
                            }
                            if (isItemDefaultSelected) {
                                if (multiSelect) {
                                    optionsSelected.push(option);
                                } else {
                                    if (optionsSelected === null) {
                                        optionsSelected = option;
                                    } else {
                                        if (!warningGiven) {
                                            console.warn("Autocomplete Multiselect: Multiple options are set as default for a single select. First option is set as the selected one.");
                                            warningGiven = true;
                                        }
                                    }
                                }
                            }
                        } else {
                            // Else check if option is selected (based on the title). This is done since it can be the case that the options have been changed.
                            if (multiSelect) {
                                if (this.optionsSelected.find(option => option.title === optionTitle)) {
                                    optionsSelected.push(option);
                                }
                            } else if (this.optionsSelected !== null) {
                                if (this.optionsSelected.title === optionTitle) {
                                    optionsSelected = option;
                                }
                            }
                        }
                        return option;
                    })
                    refreshState = true;
                    this.initialized = true;
                    this.refreshData = false;
                    this.optionsSelected = optionsSelected;
                    // Store response in responseAttribute
                    this.props.responseAttribute.setValue(JSON.stringify(optionsSelected));
                }
                this.loading = false;
            }
        }

        if (refreshState) {
            this.setState({updateDate: new Date()});
        }
    }

    /**
     * Function called when a new value is selected or value(s) are deselected. 
     * 
     * @param {*} event - the event that triggered this action
     * @param {*} newValue - the new value of the dropdown
     * @param {*} reason - the reason that this action is triggered, either select-option, remove-option, create-option, blur or clear
     * @param {*} details - more details about the option for which this event is triggered
     */
    changeInput(event, newValue, reason, details) {
        // Store response in responseAttribute and call on change action
        this.props.responseAttribute.setValue(JSON.stringify(newValue));
        
        if (this.props.onChangeAction && this.props.onChangeAction.canExecute) {
            this.props.onChangeAction.execute();
        }
        // Update the widget with the new values selected
        this.optionsSelected = newValue;
        this.setState({updateDate: new Date()}); 
    }

    openDropdown() {
        this.loading = true;
        if (this.props.onOpenAction && this.props.onOpenAction.canExecute) {
            this.props.onOpenAction.execute();
        }
    }

    render() {
        // Do not render the widget if it is not initialized yet
        if(!this.initialized) {
            return ''
        }

        // If the disabled property is not filled, the widget will be editable
        let disabled = this.props.editable ? !this.props.editable.value : false;
        // Check if user has rights on response attribute
        if(!disabled && this.props.responseAttribute.readOnly) {
            console.warn('Autocomplete Multiselect: User has no rights to change the response attribute.')
            disabled = true;
        }
        
        const noOptionsText = this.props.noOptionsText ? this.props.noOptionsText.value : undefined;

        const placeholder = this.props.placeholder ? this.props.placeholder.value : undefined;

        const limitTags = this.props.limitTags > 0 ? this.props.limitTags : undefined;
        
        const label = this.props.label ? this.props.label.value : undefined;

        let onOpen = undefined;
        if (this.props.loadOnOpen) {
            onOpen = this.onOpenDropdown;
        }

        // if component is loading, hide options
        const options = this.loading ? [] : this.options

        const loadingText = this.props.loadingText ? this.props.loadingText.value : undefined;

        return <AutocompleteUI 
                    key = {this.autoCompleteKey}
                    multiple = {this.props.multiple}
                    disabled = {disabled}
                    disableCloseOnSelect = {this.props.disableCloseOnSelect}
                    options = {options}
                    value = {this.optionsSelected}
                    onChange = {this.onInputChange}
                    noOptionsText = {noOptionsText}
                    limitTags={limitTags}
                    showCheckboxes = {this.props.showCheckboxes}
                    variant={this.props.variant}
                    label={label}
                    placeholder={placeholder}
                    filterSelectedOptions={this.props.filterSelectedOptions}
                    onOpen = {onOpen}
                    loading = {true}
                    loadingText = {loadingText}
            />;
    }
}



