import * as React from "react";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import "nav-frontend-skjema-style";
import { SkjemaGruppeFeilContext, SkjemaGruppeFeilContextProps } from ".";

export interface CheckboksPanelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  subtext?: string;
  feil?: boolean;
}

export interface CheckboksPanelState {
  checked: boolean;
  hasFocus: boolean;
}

class CheckboksPanel extends React.Component<
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
    const { id, label, subtext, disabled, feil, ...other } = this.props;
    const { hasFocus, checked } = this.state;
    const inputId = id || guid();

    const cls = (feil) =>
      classNames("inputPanel checkboksPanel", {
        "inputPanel--checked": checked && !disabled,
        "inputPanel--focused": hasFocus && !disabled,
        "inputPanel--disabled": disabled === true,
        "skjemaelement__input--harFeil": feil && !checked,
      });

    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => (
          <label
            className={cls(disabled ? false : !!context.feil || !!feil)}
            htmlFor={inputId}
          >
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

export default CheckboksPanel;
