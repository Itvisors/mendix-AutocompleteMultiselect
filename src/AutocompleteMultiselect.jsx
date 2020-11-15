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
        this.defaultOptions = [];
        this.initialized = false;
    }

    componentDidUpdate (prevProps) {
        let refreshState = false;
        // First check if the datasource has been loaded
        if (this.props.dataSourceOptions.status === 'available') {
            // If the items have been changed, change the options
            if (this.props.dataSourceOptions.items !== prevProps.dataSourceOptions.items) {
                this.initialized = true;
                let index = 0;
                this.defaultOptions = [];
                this.options = this.props.dataSourceOptions.items.map(item => {
                    const option = {title: this.props.titleAttr(item).value, index: index};
                    index++;
                    // If widget is not yet initialized, get default options
                    if (!this.initialized && this.props.defaultSelectedAttr(item).value) {
                        this.defaultOptions.push(option);
                    }
                    return option;
                })
                refreshState = true;
            }
        }
        // Refresh the data if the refreshAttribute has been set to true
        if(this.props.refreshAttribute && !prevProps.refreshAttribute) {
            if(this.props.refreshAttribute.value) {
                this.props.refreshAttribute.setValue(false);
                this.autoCompleteKey++;
                this.initialized = false;
                refreshState = true;
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
            if (this.props.selectOptionAction) {
                const selectOptionAction = this.props.selectOptionAction(this.props.dataSourceOptions.items[details.option.index]);
                if (selectOptionAction.canExecute) {
                    selectOptionAction.execute();
                }
            }
        } else if (reason === "remove-option") {
            if (this.props.deselectOptionAction) {
                const deselectOptionAction = this.props.deselectOptionAction(this.props.dataSourceOptions.items[details.option.index]);
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
                    defaultValue = {this.defaultOptions}
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



