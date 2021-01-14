import React, { Component } from "react";
import { Knapp } from "nav-frontend-knapper";
import { EkspanderbartpanelBase } from "./";

const btnStyle = { marginRight: "0.5rem", marginBottom: "1rem" };
export default class EkspanderbartpanelEksempel extends Component {
  state = {
    apen: false,
  };

  open() {
    this.setState({ apen: true });
  }

  close() {
    this.setState({ apen: false });
  }

  toggle() {
    this.setState((state) => ({ apen: !state.apen }));
  }

  render() {
    return (
      <div>
        <Knapp onClick={() => this.open()} style={btnStyle}>
          Åpne
        </Knapp>
        <Knapp onClick={() => this.close()} style={btnStyle}>
          Lukke
        </Knapp>
        <EkspanderbartpanelBase
          tittel="Kan også klikke her"
          apen={this.state.apen}
          onClick={() => this.toggle()}
        >
          Alt innholdet ditt
        </EkspanderbartpanelBase>
      </div>
    );
  }
}
