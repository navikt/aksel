import React from "react";
import { Textarea } from "..";

class TextareaExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <Textarea
        value={this.state.value}
        onChange={(e) => this.setState({ value: e.target.value })}
      />
    );
  }
}

export default TextareaExample;
