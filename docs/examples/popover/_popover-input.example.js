import React, { Component } from "react";
import { Input } from "nav-frontend-skjema";
import { guid } from "nav-frontend-js-utils";
// eslint-disable-next-line
import Popover from "nav-frontend-popover";

export default class PopoverInputEksempel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anker: undefined,
    };

    this.popoverId = guid();
    this.inputRef = React.createRef();
  }

  togglePopover = (anker) => {
    this.setState({ anker: this.state.anker ? undefined : anker });
  };

  handleChange = (e) => {
    if (e.target.value && !this.state.anker) {
      this.togglePopover(e.currentTarget);
    } else if (!e.target.value) {
      this.togglePopover(undefined);
    }
  };

  render() {
    return (
      <div>
        <Input label="Skriv noe" onChange={this.handleChange} />
        <Popover
          id={this.popoverId}
          ankerEl={this.state.anker}
          onRequestClose={() => this.setState({ anker: undefined })}
          orientering="under-venstre"
          autoFokus={false}
          utenPil
        >
          <p style={{ padding: "1rem" }}>Dette er en popover.</p>
        </Popover>
      </div>
    );
  }
}
