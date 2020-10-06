import React, { Component } from "react";
import { ToggleGruppe, ToggleKnapp } from "./src/index.ts";

export default class ControlledToggleGruppe extends Component {
  constructor(props) {
    super(props);

    this.state = { gruppe1: "knapp-1" };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <ToggleGruppe name="gruppe1" onChange={this.onChange} className="blokk-m">
        <ToggleKnapp value="knapp-1" checked={this.state.gruppe1 === "knapp-1"}>
          Knapp en
        </ToggleKnapp>
        <ToggleKnapp value="knapp-2" checked={this.state.gruppe1 === "knapp-2"}>
          Knapp to
        </ToggleKnapp>
      </ToggleGruppe>
    );
  }
}
