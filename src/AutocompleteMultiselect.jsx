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
        this.refreshData = true;
    }

    componentDidUpdate (prevProps) {
        let refreshState = false;

        // Refresh the data if the refreshAttribute has been set to true
        if(prevProps.refreshAttribute && this.props.refreshAttribute.value && !prevProps.refreshAttribute.value) {
            this.props.refreshAttribute.setValue(false);
            this.autoCompleteKey++;
            this.refreshData = true;
            refreshState = true;
        }

        // Check if the datasource has been loaded
        if (this.props.dataSourceOptions.status === 'available') {
            // If the items have been changed or if date needs to be refreshed, change the options
            if (this.refreshData ||
                this.props.dataSourceOptions.items !== prevProps.dataSourceOptions.items) {
                let index = 0;
                let optionsSelected = [];
                this.options = this.props.dataSourceOptions.items.map(item => {
                    const optionTitle = this.props.titleAttr(item).value;
                    const option = {title: optionTitle, index: index};
                    index++;
                    // If data needs to be refreshed, get default options
                    if (this.refreshData) {
                        if (this.props.defaultSelectedAttr && this.props.defaultSelectedAttr(item).value) {
                            optionsSelected.push(option);
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
            }
        }

        if (refreshState) {
            this.setState({updateDate: new Date()});
        }
    }

    /**
     * 
     * @param {*} event - the event that triggered this action
     * @param {*} newValue - the new value of the dropdown
     * @param {*} reason - the reason that this action is triggered, either select-option, remove-option, create-option, blur or clear
     * @param {*} details - more details about the option for which this event is triggered
     */
    changeInput(event, newValue, reason, details) {
        if (reason === "select-option") {
            //does not yet work
            const item = this.props.dataSourceOptions.items[details.option.index];
            if (this.props.selectOptionAction) {
                const selectOptionAction = this.props.selectOptionAction.myListAction(item);
                if (selectOptionAction.canExecute) {
                    selectOptionAction.execute();
                }
            }
        } else if (reason === "remove-option") {
            //does not yet work
            const item = this.props.dataSourceOptions.items[details.option.index];
            if (this.props.deselectOptionAction) {
                const deselectOptionAction = this.props.deselectOptionAction(item);
                if (deselectOptionAction.canExecute) {
                    deselectOptionAction.execute();
                }
            }
        } else if (reason === "clear") {
            const clearAllAction = this.props.clearAllAction;
            if (clearAllAction && clearAllAction.canExecute) {
                clearAllAction.execute();
            }
        }
        this.optionsSelected = newValue;
        this.setState({updateDate: new Date()}); 
    }

    render() {
        //Do not render the widget if it is not initialized yet
        if(!this.initialized) {
            return ''
        }

        //If the property is not filled, the widget will be editable
        const disabled = this.props.editable ? !this.props.editable.value : false;
        
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



