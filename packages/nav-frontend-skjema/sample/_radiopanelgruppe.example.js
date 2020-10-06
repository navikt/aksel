import React from "react";

import { RadioPanelGruppe } from "..";

class RadioPanelGruppeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: "juice1" };

    this.radios = [
      {
        label: "Eplejuice",
        value: "juice1",
        id: `juice1id-${this.props.name}`,
      },
      {
        label: "Appelsinjuice",
        value: "juice2",
        id: `juice2id-${this.props.name}`,
      },
      {
        label: "Melk",
        value: "melk",
        disabled: true,
        id: `melkid-${this.props.name}`,
      },
      {
        label: "Ananasjuice",
        value: "juice3",
        id: `juice4id-${this.props.name}`,
      },
    ];
  }

  onChange = (event, value) => {
    this.setState({ checked: value });
  };

  render() {
    return (
      <RadioPanelGruppe
        name={this.props.name}
        legend="Hvilken drikke er best?"
        radios={this.radios}
        checked={this.state.checked}
        onChange={this.onChange}
        feil={this.props.feil ? "Her er det en feil." : undefined}
      />
    );
  }
}

export default RadioPanelGruppeExample;
