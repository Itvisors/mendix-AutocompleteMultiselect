import { Component, createElement } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

export class AutocompleteUI extends Component {
    render() {
        return (
            <Autocomplete
                inputValue={this.props.inputValue}
                key={this.props.key}
                multiple={this.props.multiple}
                size="small"
                disabled={this.props.disabled}
                filterSelectedOptions={this.props.filterSelectedOptions}
                disableCloseOnSelect={this.props.disableCloseOnSelect}
                options={
                    this.props.sortGroups && this.props.enableGrouping
                        ? this.props.options.sort((a, b) => {
                              if (!a.group && !b.group) {
                                  return 0;
                              }
                              if (!a.group) {
                                  return 1;
                              }
                              if (!b.group) {
                                  return -1;
                              }
                              return a.group.localeCompare(b.group);
                          })
                        : this.props.options
                }
                value={this.props.value}
                getOptionLabel={option => option.title}
                onChange={this.props.onChange}
                noOptionsText={this.props.noOptionsText}
                limitTags={this.props.limitTags}
                onOpen={this.props.onOpen}
                loading={this.props.loading}
                loadingText={this.props.loadingText}
                onInputChange={this.props.onInputChange}
                isOptionEqualToValue={(option, value) => option.title === value.title && option.key === value.key}
                groupBy={this.props.enableGrouping ? option => option.group : undefined}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        {this.props.showCheckboxes ? <Checkbox checked={selected} /> : null}
                        {option.title}
                    </li>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant={this.props.variant}
                        label={this.props.label}
                        placeholder={this.props.placeholder}
                    />
                )}
            />
        );
    }
}
