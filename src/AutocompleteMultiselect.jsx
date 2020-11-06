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
        this.initialized = false;
        this.autoCompleteKey = 0;
        this.onInputChange = this.changeInput.bind(this);
        this.options = [];
        this.defaultOptions = undefined;
    }

    changeInput(event, newValue, reason, details) {
        if (reason === "select-option") {
            const onChangeAction = this.props.onChangeAction(this.props.dataSourceOptions.items[details.option.index]);
            if (onChangeAction && onChangeAction.canExecute) {
                onChangeAction.execute();
            }
        }
        //remove-option
        //blur
        //called when a new value is selected or value(s) are deleted
    }

    render() {
        if (!this.initialized) {
            if (this.props.dataSourceOptions.status === 'available') {
                this.initialized = true;
                let index = 0;
                this.options = this.props.dataSourceOptions.items.map(item => {
                    const option = {title: this.props.titleAttr(item).value, index: index};
                    index++;
                    return option;
                })
            }
        }

        return <Autocomplete 
                key = {this.autoCompleteKey}
                multiple = {true}
                disabled = {false}
                disableCloseOnSelect = {false}
                options = {this.options}
                defaultValue = {undefined}
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



