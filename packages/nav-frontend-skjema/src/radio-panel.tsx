import * as React from "react";
import * as classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import { SkjemaGruppeFeilContext, SkjemaGruppeFeilContextProps } from ".";
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

export default RadioPanel;
