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
        this.options = [];
        this.optionsSelected = [];
        this.initialized = false;

        // Initialize to true to make sure data is retrieved when initializing widget
        this.refreshData = true;
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

        // Check if the datasource has been loaded
        if (this.props.dataSourceOptions.status === 'available') {
            // If the items have been changed or if date needs to be refreshed, change the options
            if (this.refreshData ||
                this.props.dataSourceOptions.items !== prevProps.dataSourceOptions.items) {
                let warningGiven = false;
                const multiSelect = this.props.multiple;
                let optionsSelected = multiSelect ? [] : null;
                
                // Map the options and get the selected ones
                this.options = this.props.dataSourceOptions.items.map(item => {
                    const optionTitle = this.props.titleAttr(item).value;
                    const option = {title: optionTitle};
                    // If data needs to be refreshed, get default options
                    if (this.refreshData) {
                        if (this.props.defaultSelectedAttr && this.props.defaultSelectedAttr(item).value) {
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
                        // Else check if option is selected
                        if (this.optionsSelected.find(option => option.title === optionTitle)) {
                            optionsSelected.push(option);
                        }
                    }
                    return option;
                })
                refreshState = true;
                this.initialized = true;
                this.refreshData = false;
                this.optionsSelected = optionsSelected;
                // Store response in responseAttribute and call on change action
                this.props.responseAttribute.setValue(JSON.stringify(optionsSelected));
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

        return <AutocompleteUI 
                    key = {this.autoCompleteKey}
                    multiple = {this.props.multiple}
                    disabled = {disabled}
                    disableCloseOnSelect = {this.props.disableCloseOnSelect}
                    options = {this.options}
                    value = {this.optionsSelected}
                    onChange = {this.onInputChange}
                    noOptionsText = {noOptionsText}
                    limitTags={limitTags}
                    showCheckboxes = {this.props.showCheckboxes}
                    variant={this.props.variant}
                    label={label}
                    placeholder={placeholder}
                    filterSelectedOptions={this.props.filterSelectedOptions}
            />;
    }
}



