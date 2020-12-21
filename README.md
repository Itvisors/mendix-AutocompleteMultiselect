## AutocompleteMultiselect
Widget that can be used to select one or many options from a dropdown. The user can search in the dropdown for the option he is looking for. Widget is based on https://material-ui.com/components/autocomplete/.

## Features
- Select multiple options out of a list
- Use as single select
- User can search easily for the correct option
- Limit the tags to show in the front-end
- Styling options

## Usage
This widget can be used with or without context object. Configure the data source to retrieve the options to show in the dropdown and select which attribute can be used as title. If you want some options to be selected when rendering the widget, also choose the attribute that can be used for the default selection property. Sometimes you need the options to be non-persistent, e.g. when the default selected attribute cannot be stored in the database. After these options are configured, the events can be setup that are triggered when options are (de)selected.

## Configuration
### General
- Default mendix behavior for labeling and visibility.
- Editable: Expression that can be used to indicate whether the widget is editable or not. If left empty, the widget will be editable.
- Data source: Should return the options to be rendered.
- Title: The attribute that is used to show as dropdown option.
- Default selected: Boolean attribute where is stored whether this option should be selected by default when loading the widget for the first time.
- Multi-select: If set to true, multiple options can be selected. Otherwise, the widget can be used as single-select.

### Events
- On Change Action: Action to trigger when an option is selected or deselected. Since this action for every change and this can happen quite fast if "No close on select" is set to true, it is wise to keep this action very short. If this combination is used, the response can best be mapped and used when e.g. saving the page or when the results are used.
- Response: Attribute where the selected items are stored in json format ([{"title":"example1"}]). User needs write access on this attribute.
- Refresh: Set to true to refresh the widget back to the default values, widget will set the value back to false. Make sure the user has got access rights.


### Behavior
- No close on select: Whether or not to close the list when an item is selected. Set to true to not close the list when an item is selected.
- Filter selected options: Whether or not to filter the options out of the list that are already selected.
- Limit Tags: Maximum number of selected tags to show if the dropdown is closed. If more options are selected, there will be an indication how many options are selected (e.g. +2) If set to 0, there is no limit.

### Layout
- No Options: Text to show when no options found.
- Placeholder: Default value to show as placeholder.
- Label: Other way to display the label, within the widget.
- Variant: How the text field will be styled, either standard or outlined.
- Checkboxes: Whether or not to show checkboxes in front of the options.
