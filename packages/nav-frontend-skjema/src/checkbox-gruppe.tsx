import * as React from "react";
import classNames from "classnames";
import { SkjemaGruppe, SkjemaGruppeProps } from ".";
import "nav-frontend-skjema-style";

class CheckboxGruppe extends React.Component<SkjemaGruppeProps> {
  render() {
    const { children, className, ...other } = this.props;
    return (
      <SkjemaGruppe
        className={classNames("checkboxgruppe", className)}
        {...other}
      >
        {children}
      </SkjemaGruppe>
    );
  }
}

export default CheckboxGruppe;
