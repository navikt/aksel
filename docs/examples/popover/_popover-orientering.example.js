import React, { Component } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Knapp } from "nav-frontend-knapper";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Select } from "nav-frontend-skjema";
// eslint-disable-next-line
import Popover from "nav-frontend-popover";

export default class PopoverOrienteringEksempel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientering: "over",
    };
  }

  togglePopover = (anker) => {
    this.setState({ anker: this.state.anker ? undefined : anker });
  };

  render() {
    return (
      <div>
        <div style={{ width: 204 }}>
          <Select
            label="Velg orientering"
            onChange={(e) => this.setState({ orientering: e.target.value })}
            defaultValue={this.state.orientering}
          >
            <option value="over">Over</option>
            <option value="under">Under</option>
            <option value="hoyre">Høyre</option>
            <option value="venstre">Venstre</option>
            <option value="over-venstre">Over, fra venstre kant</option>
            <option value="over-hoyre">Over, fra høyre kant</option>
            <option value="under-venstre">Under, fra venstre kant</option>
            <option value="under-hoyre">Under, fra høyre kant</option>
          </Select>
          <Knapp onClick={(e) => this.togglePopover(e.currentTarget)}>
            Åpne popover
          </Knapp>
        </div>

        <Popover
          ankerEl={this.state.anker}
          onRequestClose={() => this.setState({ anker: undefined })}
          orientering={this.state.orientering}
        >
          <p style={{ margin: "1rem", maxWidth: 300 }}>
            Dette er en popover som bruker{" "}
            <code className="inline">orientering</code>
            -propen til å posisjonere seg i forhold til ankeret sitt.
          </p>
        </Popover>
      </div>
    );
  }
}
