/* eslint-disable max-classes-per-file */
import * as React from "react";
import * as PT from "prop-types";
import * as classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import {
  SkjemaGruppe,
  SkjemaGruppeFeilContext,
  SkjemaGruppeFeilContextProps,
  SkjemaelementFeilmelding,
} from ".";
import "nav-frontend-skjema-style";

export interface RadioPanelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export interface RadioPanelState {
  hasFocus: boolean;
}

export class RadioPanel extends React.Component<
  RadioPanelProps,
  RadioPanelState
> {
  constructor(props: RadioPanelProps) {
    super(props);
    this.state = { hasFocus: false };
  }

  toggleOutline() {
    this.setState({ hasFocus: !this.state.hasFocus });
  }

  render() {
    const { id, label, checked, disabled, ...other } = this.props;
    const { hasFocus } = this.state;
    const inputId = id || guid();

    const cls = classNames("inputPanel radioPanel", {
      "inputPanel--checked": checked && !disabled,
      "inputPanel--focused": hasFocus && !disabled,
      "inputPanel--disabled": disabled === true,
    });

    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => (
          <label className={cls} htmlFor={inputId}>
            <input
              id={inputId}
              className="inputPanel__field"
              type="radio"
              checked={checked}
              aria-checked={checked}
              disabled={disabled}
              aria-invalid={!!context.feil}
              aria-errormessage={context.feilmeldingId}
              {...other}
              onFocus={() => this.toggleOutline()}
              onBlur={() => this.toggleOutline()}
            />
            <span className="inputPanel__label">{label}</span>
          </label>
        )}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

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
