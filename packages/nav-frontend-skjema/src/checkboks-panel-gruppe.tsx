import * as React from "react";
import * as PT from "prop-types";
import { CheckboksPanel, CheckboksPanelProps, SkjemaGruppe } from ".";
import "nav-frontend-skjema-style";
import { guid } from "nav-frontend-js-utils";
import classNames from "classnames";

export interface CheckboksPanelGruppeProps
  extends React.HTMLAttributes<HTMLElement> {
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
  /**
   * Option om man skal propagere feil til children
   */
  utenFeilPropagering?: boolean;
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
