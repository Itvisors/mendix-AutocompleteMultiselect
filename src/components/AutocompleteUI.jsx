import { Component, createElement, Fragment } from "react"

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export class AutocompleteUI extends Component {
  render() {
    return <Autocomplete 
        key = {this.props.key}
        multiple = {this.props.multiple}
        size="small"
        disabled = {this.props.disabled}
        filterSelectedOptions = {this.props.filterSelectedOptions}
        disableCloseOnSelect = {this.props.disableCloseOnSelect}
        options = {this.props.options}
        value = {this.props.value}
        getOptionLabel = {option => option.title}
        onChange = {this.props.onChange}
        noOptionsText = {this.props.noOptionsText}
        limitTags={this.props.limitTags}
        onOpen = {this.props.onOpen}
        loading = {this.props.loading}
        loadingText = {this.props.loadingText}
        onInputChange={ this.props.onInputChange}
        getOptionSelected={(option, value) => (option.key.length> 0 || option.title === value.title) && option.key === value.key}
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
        />
        )}
    />;
  }
}







