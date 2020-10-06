import React from "react";

import { BekreftCheckboksPanel } from "..";

class BekreftCheckboksPanelExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  onChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div>
        <BekreftCheckboksPanel
          label="Jeg bekrefter at opplysningene jeg har gitt er riktige."
          checked={this.state.checked}
          onChange={() => this.onChange()}
          feil={
            this.props.feil
              ? "Du må bekrefte før søknaden kan sendes inn."
              : undefined
          }
        >
          <span>
            Jeg er kjent med at hvis opplysningene jeg har gitt ikke er riktige
            eller fullstendige, så kan jeg miste retten til stønad.
          </span>
        </BekreftCheckboksPanel>
      </div>
    );
  }
}

export default BekreftCheckboksPanelExample;
