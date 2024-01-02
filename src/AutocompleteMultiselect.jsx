import { Component, createElement } from "react";

import "./ui/AutocompleteMultiselect.css";

import { AutocompleteUI } from "./components/AutocompleteUI";

export default class AutocompleteMultiselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateDate: null,
            inputValue: ""
        };
        this.autoCompleteKey = 0;
        this.onChange = this.changeValues.bind(this);
        this.onOpenDropdown = this.openDropdown.bind(this);
        this.onInputChange = this.inputChange.bind(this);
        this.options = [];
        this.optionsSelected = []; // Array for multiselect, otherwise object
        this.initialized = false;
        this.searchValue = "";

        // Initialize to true to make sure data is retrieved when initializing widget
        this.refreshData = true;

        this.loading = true;

        this.showToFewCharsText = false;

        this.latestInputChange = undefined;
    }

    componentDidUpdate(prevProps) {
        let refreshState = false;

        // Refresh the data if the refreshAttribute has been set to true
        if (prevProps.refreshAttribute && this.props.refreshAttribute.value && !prevProps.refreshAttribute.value) {
            this.props.refreshAttribute.setValue(false);
            this.autoCompleteKey++;
            // Make sure data and state will be refreshed
            this.refreshData = true;
            refreshState = true;
        }

        // Check if data sourse or attribute is used
        if (this.props.JSONAttribute) {
            if (this.props.JSONAttribute.status === "available") {
                // check if the items has been changed or data needs to be refreshed
                if (this.refreshData || this.props.JSONAttribute !== prevProps.JSONAttribute) {
                    let dataParsed = [];
                    // parse the json
                    if (this.props.JSONAttribute.value && this.props.JSONAttribute.value !== "") {
                        dataParsed = JSON.parse(this.props.JSONAttribute.value);
                    }
                    // if data needs to be refreshed, reset defaults
                    if (this.refreshData) {
                        const defaultValue = dataParsed.filter(option => option.default);
                        this.props.searchValue.setValue("");
                        if (this.props.multiple) {
                            this.optionsSelected = defaultValue;
                        } else {
                            this.optionsSelected = defaultValue[0] === undefined ? null : defaultValue[0];
                            this.setState({ inputValue: this.optionsSelected ? this.optionsSelected.title : "" });
                        }
                    } else {
                        // If custom search is used, it can be that some options are not in the JSON
                        // Add these options to make sure the defaults are in, they will be filtered out if not applicable to input value
                        if (this.props.onInputChangeAction) {
                            const optionsSelectedAsArray = this.props.multiple
                                ? this.optionsSelected
                                : this.optionsSelected === null
                                ? []
                                : [this.optionsSelected];
                            const optionsSelectedNotInList = optionsSelectedAsArray.filter(
                                selectedOption =>
                                    dataParsed.find(
                                        option =>
                                            option.title === selectedOption.title && option.key === selectedOption.key
                                    ) === undefined
                            );
                            dataParsed = dataParsed.concat(optionsSelectedNotInList);
                        } else {
                            if (this.props.multiple) {
                                // Else check if optionSelected are still available. This is done since it can be the case that the options have been changed.
                                this.optionsSelected = this.optionsSelected.filter(
                                    selectedOption =>
                                        dataParsed.find(
                                            option =>
                                                option.title === selectedOption.title &&
                                                option.key === selectedOption.key
                                        ) !== undefined
                                );
                            } else if (this.optionsSelected !== null) {
                                this.optionsSelected = dataParsed.find(
                                    option =>
                                        option.title === this.optionsSelected.title &&
                                        option.key === this.optionsSelected.key
                                );
                                this.setState({ inputValue: this.optionsSelected ? this.optionsSelected.title : "" });
                            }
                            if (this.optionsSelected === undefined) {
                                this.optionsSelected = null;
                            }
                        }
                    }
                    this.options = dataParsed;

                    refreshState = true;
                    this.initialized = true;
                    this.refreshData = false;
                    // Store response in responseAttribute
                    this.props.responseAttribute.setValue(JSON.stringify(this.optionsSelected));
                    this.loading = false;
                }
            }
        } else if (this.props.dataSourceOptions !== prevProps.dataSourceOptions) {
            // Check if the datasource has been loaded
            if (this.props.dataSourceOptions.status === "available") {
                // If the items have been changed or if date needs to be refreshed, change the options
                if (this.refreshData || this.props.dataSourceOptions.items !== prevProps.dataSourceOptions.items) {
                    let warningGiven = false;
                    let optionsSelected = this.props.multiple ? [] : null;
                    let defaultSelectedString;
                    let inputValueNew = "";

                    // Map the options and get the selected ones
                    this.options = this.props.dataSourceOptions.items.map(item => {
                        const optionTitle = this.props.titleAttr.get(item).value;
                        const option = { title: optionTitle };
                        //If key is used, add key to the option
                        if (this.props.keyAttr) {
                            option.key = this.props.keyAttr.get(item).value;
                        }
                        // If data needs to be refreshed, get default options
                        if (this.refreshData) {
                            // If string is not yet filled, fill with either the json or with null
                            if (defaultSelectedString === undefined) {
                                if (this.props.defaultSelectedStringAttr !== undefined) {
                                    try {
                                        defaultSelectedString = JSON.parse(this.props.defaultSelectedStringAttr.value);
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
                                isItemDefaultSelected =
                                    this.props.defaultSelectedAttr && this.props.defaultSelectedAttr.get(item).value;
                            }
                            if (isItemDefaultSelected) {
                                if (this.props.multiple) {
                                    optionsSelected.push(option);
                                } else {
                                    if (optionsSelected === null) {
                                        optionsSelected = option;
                                        inputValueNew = optionTitle ?? "" ;
                                    } else {
                                        if (!warningGiven) {
                                            console.warn(
                                                "Autocomplete Multiselect: Multiple options are set as default for a single select. First option is set as the selected one."
                                            );
                                            warningGiven = true;
                                        }
                                    }
                                }
                            }
                        } else {
                            // Else check if option is selected (based on the title). This is done since it can be the case that the options have been changed.
                            if (this.props.multiple) {
                                if (this.optionsSelected.find(OptionLoop => OptionLoop.title === optionTitle)) {
                                    optionsSelected.push(option);
                                }
                            } else if (this.optionsSelected !== null) {
                                if (this.optionsSelected.title === optionTitle) {
                                    optionsSelected = option;
                                    this.setState({ inputValue: optionTitle ?? "" });
                                }
                            }
                        }
                        return option;
                    });
                    if (this.refreshData) {
                        this.setState({ inputValue: inputValueNew });
                    }
                    refreshState = true;
                    this.initialized = true;
                    this.refreshData = false;
                    this.optionsSelected = optionsSelected;
                    // Store response in responseAttribute
                    this.props.responseAttribute.setValue(JSON.stringify(optionsSelected));
                    this.loading = false;
                }
            }
        }

        if (refreshState) {
            this.setState({ updateDate: new Date() });
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
    changeValues(event, newValue, reason, details) {
        // Store response in responseAttribute and call on change action
        this.props.responseAttribute.setValue(JSON.stringify(newValue));

        if (this.props.onChangeAction && this.props.onChangeAction.canExecute) {
            this.props.onChangeAction.execute();
        }
        // Update the widget with the new values selected
        this.optionsSelected = newValue;
        // If filter value must be kept, restore the value after a value is selected/removed
        if (this.props.keepFilterValueAfterSelect && this.props.multiple) {
            if (reason !== "blur") {
                this.setState({ inputValue: this.searchValue ?? "" });
            }
        }
        this.setState({ updateDate: new Date() });
    }

    /**
     * Function calles when dropdown is opened
     */
    openDropdown() {
        let setLoading = false;
        if (this.props.onInputChangeAction) {
            // check if enough chars are filled
            if (this.props.searchAfterXChars.value && this.props.searchAfterXChars.value > 0) {
                //For single select, search value is still filled
                if (
                    !this.props.searchValue.value ||
                    this.props.searchValue.value.length < this.props.searchAfterXChars.value
                ) {
                    this.showToFewCharsText = true;
                    setLoading = true;
                }
            }
        }
        if (this.props.onOpenAction && this.props.onOpenAction.canExecute) {
            this.props.onOpenAction.execute();
            setLoading = true;
        }
        if (setLoading) {
            // Rerender widget
            this.loading = true;
            this.setState({ updateDate: new Date() });
        }
    }

    /**
     * Function called when a the input value changes
     *
     * @param {*} event - the event that triggered this action
     * @param {*} value - the new value of the input
     * @param {*} reason - the reason that this action is triggered, either input, clear or reset
     */
    inputChange = (event, value, reason) => {
        // Do not trigger if there is a searchvalue and option is selected or removed, this will reset the value
        if (
            !this.props.keepFilterValueAfterSelect ||
            !this.props.multiple ||
            reason === "clear" ||
            (event && event.type !== "click")
        ) {
            if (this.props.JSONAttribute) {
                if (this.props.onInputChangeAction) {
                    const timeStamp = event ? event.timeStamp : undefined;
                    this.latestInputChange = timeStamp;
                    //Check if no other inputchange will be done
                    setTimeout(
                        () => {
                            if (this.latestInputChange === timeStamp) {
                                const enoughCharsFilled =
                                    this.props.searchAfterXChars.value === undefined ||
                                    value.length >= this.props.searchAfterXChars.value;
                                // Also set value if it is cleared
                                if (enoughCharsFilled || value.length === 0) {
                                    if (this.props.searchValue) {
                                        this.props.searchValue.setValue(value);
                                    }
                                }
                                if (enoughCharsFilled) {
                                    this.showToFewCharsText = false;
                                    if (this.props.onInputChangeAction && this.props.onInputChangeAction.canExecute) {
                                        this.props.onInputChangeAction.execute();
                                    }
                                } else {
                                    this.showToFewCharsText = true;
                                    // update state since it is after timeout
                                    this.setState({ updateDate: new Date() });
                                }
                            }
                        },
                        this.props.onInputChangeDelay.value,
                        timeStamp,
                        value,
                        reason
                    );

                    this.loading = true;
                }
            }
        }
        // Bug in library when input value is changed during loading the on open action, the inputvalue is reset after data is returned
        if (event || reason !== "reset") {
            // reason is reset if options are selected/deleted
            // So store old value such that it can be set back if needed
            // Reset value on blur
            if (this.props.keepFilterValueAfterSelect && this.props.multiple) {
                if (reason !== "reset" || event.type === "blur") {
                    this.searchValue = value;
                }
            }
            this.setState({ inputValue: value ?? "" });
        }
        // make sure to rerender the widget
        this.setState({ updateDate: new Date() });
    };

    render() {
        // Do not render the widget if it is not initialized yet
        if (!this.initialized) {
            return "";
        }

        // If the disabled property is not filled, the widget will be editable
        let disabled = this.props.editable ? !this.props.editable.value : false;
        // Check if user has rights on response attribute
        if (!disabled && this.props.responseAttribute.readOnly) {
            console.warn("Autocomplete Multiselect: User has no rights to change the response attribute.");
            disabled = true;
        }

        const noOptionsText = this.props.noOptionsText ? this.props.noOptionsText.value : undefined;

        const placeholder = this.props.placeholder ? this.props.placeholder.value : undefined;

        const limitTags = this.props.limitTags > 0 ? this.props.limitTags : undefined;

        const label = this.props.label ? this.props.label.value : undefined;

        // Following options only used when json attribute is used
        let onOpen;
        let loading;
        let loadingText;
        let options = this.options;
        if (this.props.JSONAttribute) {
            onOpen = this.onOpenDropdown;
            loading = this.loading;
            // set loading text, if to few chars are filled use this text.
            if (this.showToFewCharsText) {
                loadingText = this.props.searchAfterXCharsText
                    ? this.props.searchAfterXCharsText.value
                    : "Enter at least " + this.props.searchAfterXChars.value + " characters";
            } else {
                loadingText = this.props.loadingText ? this.props.loadingText.value : undefined;
            }
            // if component is loading, hide options
            if (this.loading) {
                options = [];
            }
        }

        return (
            <AutocompleteUI
                key={this.autoCompleteKey}
                multiple={this.props.multiple}
                disabled={disabled}
                disableCloseOnSelect={this.props.disableCloseOnSelect}
                options={options}
                value={this.optionsSelected}
                onChange={this.onChange}
                noOptionsText={noOptionsText}
                limitTags={limitTags}
                showCheckboxes={this.props.showCheckboxes}
                variant={this.props.variant}
                label={label}
                placeholder={placeholder}
                filterSelectedOptions={this.props.filterSelectedOptions}
                onOpen={onOpen}
                loading={loading}
                loadingText={loadingText}
                onInputChange={this.onInputChange}
                inputValue={this.state.inputValue}
            />
        );
    }
}
