import * as React from "react";
import * as PT from "prop-types";
import { guid } from "nav-frontend-js-utils";
import "nav-frontend-skjema-style";
import classNames from "classnames";

export interface ToggleKnappProps {
  children: React.ReactNode;
  name?: string;
  onChange?: (event: React.SyntheticEvent<EventTarget>) => void;
  defaultChecked?: boolean;
  value: string;
  checked?: boolean;
  className?: string;
}

class ToggleKnapp extends React.Component<ToggleKnappProps> {
  render() {
    const {
      children,
      name,
      defaultChecked,
      value,
      onChange,
      checked,
      className,
    } = this.props;
    if (checked !== undefined && !onChange) {
      // Trenger bare onChange om man definerer checked
      console.warn(`onChange har verdien: ${onChange}`);
    }
    const knappId = guid();
    const cls = (classes) => classNames("toggle__label", classes);
    return (
      <div>
        <input
          type="radio"
          className="toggle__input sr-only"
          defaultChecked={defaultChecked}
          onChange={onChange}
          name={name}
          id={knappId}
          value={value}
          checked={checked}
          aria-checked={checked}
        />
        <label className={cls(className)} htmlFor={knappId}>
          {children}
        </label>
      </div>
    );
  }
}

(ToggleKnapp as React.ComponentClass).defaultProps = {
  defaultChecked: undefined,
  checked: undefined,
  className: undefined,
  onChange: undefined,
  name: "ToggleKnapp-default-name",
};

(ToggleKnapp as React.ComponentClass).propTypes = {
  /**
   * Innhold i label
   */
  children: PT.node.isRequired,
  /**
   * Navnet som brukes på radio knappen
   */
  name: PT.string,
  /**
   * Funksjon som håndterer endring av valgt knapp.
   * Funksjonen tar event. Iden til det klikkede elementet ligger på e.target.value
   * onChange kalles hver gang en knapp blir trykket.
   */
  onChange: PT.func,
  /**
   * Mulighet til å oppgi iden til en knapp som vil være satt som default
   */
  defaultChecked: PT.bool,
  /**
   * Value som brukes på alle ToggleKnapper i gruppen
   */
  value: PT.string.isRequired,
  /**
   * Marker en knapp som valgt
   */
  checked: PT.bool,
  /**
   * Classname
   */
  className: PT.string,
};

export default ToggleKnapp;
