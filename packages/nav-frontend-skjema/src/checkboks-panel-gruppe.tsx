/* eslint-disable max-classes-per-file */
import * as React from "react";
import * as PT from "prop-types";
import * as classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import "nav-frontend-skjema-style";
import {
  SkjemaGruppe,
  SkjemaGruppeFeilContext,
  SkjemaGruppeFeilContextProps,
} from ".";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";

export interface CheckboksPanelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  subtext?: string;
}

export interface CheckboksPanelState {
  checked: boolean;
  hasFocus: boolean;
}

export class CheckboksPanel extends React.Component<
  CheckboksPanelProps,
  CheckboksPanelState
> {
  constructor(props: CheckboksPanelProps) {
    super(props);
    this.state = { hasFocus: false, checked: !!this.props.checked };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ checked: !!newProps.checked });
  }

  handleChange = (e) => {
    this.setState({ checked: e.target.checked });
    if (typeof this.props.onChange === "function") this.props.onChange(e);
  };

  toggleOutline() {
    this.setState({ hasFocus: !this.state.hasFocus });
  }

  render() {
    const { id, label, subtext, disabled, ...other } = this.props;
    const { hasFocus, checked } = this.state;
    const inputId = id || guid();

    const cls = classNames("inputPanel checkboksPanel", {
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
              type="checkbox"
              checked={checked}
              aria-checked={checked}
              disabled={disabled}
              aria-invalid={!!context.feil}
              aria-errormessage={context.feilmeldingId}
              {...other}
              onFocus={() => this.toggleOutline()}
              onBlur={() => this.toggleOutline()}
              onChange={this.handleChange}
            />
            <span className="inputPanel__label">{label}</span>
            {subtext && <span className="inputPanel__subtext">{subtext}</span>}
          </label>
        )}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

export interface CheckboksPanelGruppeProps {
  /**
   * Array av checkbokser
   */
  checkboxes: CheckboksPanelProps[];
  /**
   * Overskrift
   */
  legend?: React.ReactNode;
  /**
   * Ekstrainformasjon under overskrift
   */
  description?: React.ReactNode;
  /**
   * Callback-funksjon som blir kalt straks noen av checkboksene endrer state
   */
  onChange: (event: React.SyntheticEvent<EventTarget>, value?: any) => void;
  /**
   * Feilmarkering
   */
  feil?: React.ReactNode | boolean;
  /**
   * Styling klasse for container
   */
  className?: string;
}

class CheckboksPanelGruppe extends React.Component<CheckboksPanelGruppeProps> {
  render() {
    const {
      checkboxes,
      legend,
      feil,
      onChange,
      className,
      ...other
    } = this.props;
    const feilmeldingId = guid();
    return (
      <SkjemaGruppe
        className={classNames("inputPanelGruppe", className)}
        legend={legend}
        feil={feil}
        feilmeldingId={feilmeldingId}
        {...other}
      >
        <div className="inputPanelGruppe__inner">
          {checkboxes.map((checkbox: CheckboksPanelProps) => (
            <CheckboksPanel
              key={`${checkbox.id}${checkbox.label}`}
              onChange={(event: React.SyntheticEvent<EventTarget>) =>
                onChange(event, checkbox.value)
              }
              {...checkbox}
            />
          ))}
        </div>
      </SkjemaGruppe>
    );
  }
}

(CheckboksPanelGruppe as React.ComponentClass).propTypes = {
  checkboxes: PT.array.isRequired,
  legend: PT.node,
  description: PT.node,
  onChange: PT.func.isRequired,
  feil: PT.oneOfType([PT.node, PT.bool]),
};

(CheckboksPanelGruppe as React.ComponentClass).defaultProps = {
  feil: undefined,
};

export default CheckboksPanelGruppe;
