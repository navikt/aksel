import * as React from "react";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import { SkjemaGruppeFeilContext, SkjemaGruppeFeilContextProps } from ".";
import "nav-frontend-skjema-style";

export interface RadioPanelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  /**
   * Referanse til selve radioknappen. Brukes for eksempel til å sette fokus
   */
  radioRef?: (element: HTMLInputElement | null) => any;
  feil?: boolean;
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
    const {
      id,
      label,
      checked,
      disabled,
      radioRef,
      feil,
      ...other
    } = this.props;
    const { hasFocus } = this.state;
    const inputId = id || guid();

    const cls = (feil) =>
      classNames("inputPanel radioPanel", {
        "inputPanel--checked": checked && !disabled,
        "inputPanel--focused": hasFocus && !disabled,
        "inputPanel--disabled": disabled === true,
        "skjemaelement__input--harFeil": feil && !checked,
      });

    /* eslint-disable jsx-a11y/role-supports-aria-props */
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
              type="radio"
              checked={checked}
              aria-checked={checked}
              disabled={disabled}
              aria-invalid={!!context.feil}
              aria-errormessage={context.feilmeldingId}
              ref={radioRef}
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

export default RadioPanel;
