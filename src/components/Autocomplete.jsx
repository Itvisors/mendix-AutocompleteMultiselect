import { Component, createElement } from "react";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export class HelloWorldSample extends Component {
    
    render() {
        return <div className="widget-hello-world">Hello {this.props.sampleText}</div>;
    }
}
