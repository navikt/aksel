import * as React from "react";
import * as PT from "prop-types";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import { RadioPanel, RadioPanelProps, SkjemaGruppe } from ".";

import "nav-frontend-skjema-style";

export interface RadioPanelGruppeProps {
  /**
   * Array av radioknapper
   */
  radios: RadioPanelProps[];
  /**
   * Name for radiobutton gruppe
   */
  name: string;
  /**
   * Felles overskrift for radiogruppen
   */
  legend?: React.ReactNode;
  /**
   * Ekstrainformasjon under overskrift
   */
  description?: React.ReactNode;
  /**
   * Callback-funksjon som blir kalt straks noen av radioknappene endrer state
   */
  onChange: (event: React.SyntheticEvent<EventTarget>, value: any) => void;
  /**
   * Egendefinert klassenavn
   */
  className?: string;
  /**
   * Radioverdi som skal være default checked
   */
  checked?: string;
  /**
   * Feilmarkering
   */
  feil?: React.ReactNode | boolean;
  /**
   * Option om man skal propagere feil til children
   */
  utenFeilPropagering?: boolean;
}

class RadioPanelGruppe extends React.Component<RadioPanelGruppeProps> {
  render() {
    const {
      radios,
      name,
      legend,
      feil,
      checked,
      onChange,
      className,
      ...other
    } = this.props;
    const cls = classNames("inputPanelGruppe", className);
    const feilmeldingId = guid();
    return (
      <SkjemaGruppe
        className={cls}
        legend={legend}
        feil={feil}
        feilmeldingId={feilmeldingId}
        {...other}
      >
        <div className="inputPanelGruppe__inner">
          {radios.map((radio: RadioPanelProps) => (
            <RadioPanel
              name={name}
              key={`${name}-${radio.value}`}
              checked={checked === radio.value}
              onChange={(event: React.SyntheticEvent<EventTarget>) =>
                onChange(event, radio.value)
              }
              {...radio}
            />
          ))}
        </div>
      </SkjemaGruppe>
    );
  }
}

(RadioPanelGruppe as React.ComponentClass).propTypes = {
  radios: PT.array.isRequired,
  name: PT.string.isRequired,
  legend: PT.node,
  description: PT.node,
  onChange: PT.func.isRequired,
  className: PT.string,
  feil: PT.oneOfType([PT.node, PT.bool]),
};

(RadioPanelGruppe as React.ComponentClass).defaultProps = {
  feil: undefined,
};

export default RadioPanelGruppe;
