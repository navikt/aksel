import React, { createRef } from "react";
import Knapp from "nav-frontend-knapper";
import { RadioPanelGruppe } from "..";

class RadioPanelGruppeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: "juice1" };
    this.ref = createRef();
    this.radios = [
      {
        label: "Eplejuice",
        value: "juice1",
        id: `juice1id-${this.props.name}`,
        radioRef: (ref) => (this.ref.current = ref),
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
      <div>
        <RadioPanelGruppe
          name={this.props.name}
          legend="Hvilken drikke er best?"
          radios={this.radios}
          checked={this.state.checked}
          onChange={this.onChange}
          feil={
            this.props.feil
              ? "Feilmeldingstekst må gjenta nøkkelord fra label"
              : undefined
          }
          utenFeilPropagering={!!this.props.utenFeilPropagering}
        />
        {this.props.button && (
          <Knapp
            style={{ marginTop: "1rem" }}
            onClick={() => this.ref.current.focus()}
          >
            Fokus radiopanel
          </Knapp>
        )}
      </div>
    );
  }
}

export default RadioPanelGruppeExample;
