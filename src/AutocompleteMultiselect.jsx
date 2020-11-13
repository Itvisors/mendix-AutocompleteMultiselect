import { Component, createElement, Fragment } from "react";

import "./ui/AutocompleteMultiselect.css";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

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

    changeInput(event, newValue, reason, details) {
        if (reason === "select-option") {
            const selectOptionAction = this.props.selectOptionAction(this.props.dataSourceOptions.items[details.option.index]);
            if (selectOptionAction && selectOptionAction.canExecute) {
                selectOptionAction.execute();
            }
        }
        //remove-option
        //blur
        //called when a new value is selected or value(s) are deleted
    }

    render() {
        //Do not render the widget if it is not initialized yet
        if(!this.initialized) {
            return ''
        }

        //If the property is not filled, the widget will be editable
        let disabled = this.props.editable ? !this.props.editable.value : false;

        return <Autocomplete 
                key = {this.autoCompleteKey}
                multiple = {true}
                disabled = {disabled}
                disableCloseOnSelect = {false}
                options = {this.options}
                defaultValue = {this.defaultOptions}
                getOptionLabel = {option => option.title}
                onChange = {this.onInputChange}
                noOptionsText = {undefined}
                limitTags={undefined}
                renderOption={(option, { selected }) => (
                    <Fragment>
                      {false ? <Checkbox
                        checked={selected}
                      /> : null }
                      {option.title}
                    </Fragment>
                  )}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                  />
                )}

            />;
    }
}



