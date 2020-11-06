import { Component, createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/AutocompleteMultiselect.css";

export default class AutocompleteMultiselect extends Component {
    render() {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}
