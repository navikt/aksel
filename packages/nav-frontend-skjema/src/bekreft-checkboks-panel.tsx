import * as React from "react";
import classNames from "classnames";
import * as PT from "prop-types";
import { guid } from "nav-frontend-js-utils";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import { Checkbox } from ".";
import "nav-frontend-skjema-style";

export interface BekreftCheckboksPanelProps {
  /**
   * Callback-funksjon som blir kalt når checkboksen endrer state
   */
  onChange: (event: React.SyntheticEvent<EventTarget>) => void;
  /**
   * Default checked state for checkboksen
   */
  checked: boolean;
  /**
   * Tekst til høyre for checkboksen
   */
  label: string;
  /**
   * Tekst over checkboksen
   */
  children?: React.ReactNode | React.ReactChildren;
  /**
   * Øvrige custom props til <input/>-elementet som ligger i bunn
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Feilmelding
   */
  feil?: React.ReactNode | boolean;
}

export class BekreftCheckboksPanel extends React.Component<BekreftCheckboksPanelProps> {
  render() {
    const {
      checked,
      onChange,
      label,
      inputProps,
      className,
      feil,
    } = this.props;
    const feilmeldingId = guid();

    const cls = classNames("bekreftCheckboksPanel", className, {
      "bekreftCheckboksPanel--checked": checked,
      "bekreftCheckboksPanel--error": feil,
    });

    return (
      <div className={cls}>
        {this.props.children && (
          <div className="bekreftCheckboksPanel__innhold">
            {this.props.children}
          </div>
        )}
        <Checkbox
          aria-invalid={!!feil}
          aria-errormessage={feil ? feilmeldingId : undefined}
          {...inputProps}
          label={label}
          checked={checked}
          aria-checked={checked}
          onChange={onChange}
        />
        <SkjemaelementFeilmelding id={feilmeldingId}>
          {typeof feil !== "boolean" && feil}
        </SkjemaelementFeilmelding>
      </div>
    );
  }
}

(BekreftCheckboksPanel as React.ComponentClass).propTypes = {
  children: PT.node,
  className: PT.string,
  checked: PT.bool.isRequired,
  label: PT.string.isRequired,
  onChange: PT.func.isRequired,
  feil: PT.oneOfType([PT.node, PT.bool]),
};

export default BekreftCheckboksPanel;
