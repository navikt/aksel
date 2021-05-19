import * as React from "react";
import * as PT from "prop-types";
import "nav-frontend-skjema-style";
import classNames from "classnames";

export interface ToggleGruppeProps {
  /**
   * Array av toggle knapper
   */
  children: React.ReactElement<any>[];
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Navn attributt til toggle knapper
   */
  name: string;
  /**
   * Valgfri callback som blir kalt ved endring
   */
  onChange?: (event: React.SyntheticEvent<EventTarget>) => void;
}

class ToggleGruppe extends React.Component<ToggleGruppeProps> {
  render() {
    const { children, name, onChange, className } = this.props;
    const cls = (classes) => classNames("toggle", classes);

    return (
      <div className={cls(className)}>
        {children.map((toggleKnapp) =>
          React.cloneElement(toggleKnapp, {
            name,
            onChange,
            key: toggleKnapp.props.value,
          })
        )}
      </div>
    );
  }
}

(ToggleGruppe as React.ComponentClass).defaultProps = {
  className: "",
  onChange: undefined,
};

(ToggleGruppe as React.ComponentClass).propTypes = {
  /**
   * Et sett med ToggleKnapp-er
   */
  children: PT.node.isRequired,
  /**
   * className
   */
  className: PT.string,
  /**
   * Navnet som brukes på radio button gruppen
   */
  name: PT.string.isRequired,
  /**
   * Funksjon som håndterer endring av valgt knapp.
   * Funksjonen tar event. Iden til det klikkede elementet ligger på e.target.value
   * onChange kalles hver gang en knapp blir trykket.
   */
  onChange: PT.func,
};

export default ToggleGruppe;
