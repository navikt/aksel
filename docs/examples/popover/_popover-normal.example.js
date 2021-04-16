import React, { Component } from "react";
import { Knapp } from "nav-frontend-knapper";
import { guid } from "nav-frontend-js-utils";
// eslint-disable-next-line
import Popover from "nav-frontend-popover";

export default class PopoverNormalEksempel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anker: undefined,
    };

    this.popoverId = guid();
  }

  togglePopover = (anker) => {
    this.setState({ anker: this.state.anker ? undefined : anker });
  };

  render() {
    return (
      <div>
        <Knapp
          onClick={(e) => this.togglePopover(e.currentTarget)}
          aria-expanded={this.state.anker !== undefined}
          aria-controls={this.popoverId}
          aria-haspopup="dialog"
        >
          Åpne popover
        </Knapp>
        <Popover
          id={this.popoverId}
          ankerEl={this.state.anker}
          onRequestClose={() => this.setState({ anker: undefined })}
        >
          <p style={{ padding: "1rem" }}>Dette er en popover.</p>
        </Popover>
      </div>
    );
  }
}
