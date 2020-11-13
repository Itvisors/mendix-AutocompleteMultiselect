import { Component, createElement, Fragment } from "react"

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export class AutocompleteUI extends Component {
  render() {
    return <Autocomplete 
        key = {this.props.key}
        multiple = {this.props.multiple}
        disabled = {this.props.disabled}
        disableCloseOnSelect = {this.props.disableCloseOnSelect}
        options = {this.props.options}
        defaultValue = {this.props.defaultValue}
        getOptionLabel = {option => option.title}
        onChange = {this.props.onInputChange}
        noOptionsText = {this.props.noOptionsText}
        limitTags={this.props.limitTags}
        renderOption={(option, { selected }) => (
            <Fragment>
            {this.props.showCheckboxes ? <Checkbox
                checked={selected}
            /> : null }
            {option.title}
            </Fragment>
        )}
        renderInput={params => (
        <TextField
            {...params}
            variant={this.props.variant}
            label={this.props.label}
            placeholder={this.props.placeholder}
            fullWidth
        />
        )}

    />;
  }
}







