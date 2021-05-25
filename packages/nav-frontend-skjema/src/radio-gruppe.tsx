import * as React from "react";
import classNames from "classnames";
import { SkjemaGruppe, SkjemaGruppeProps } from ".";
import "nav-frontend-skjema-style";
class RadioGruppe extends React.Component<SkjemaGruppeProps> {
  render() {
    const { children, className, ...other } = this.props;
    return (
      <SkjemaGruppe className={classNames("radiogruppe", className)} {...other}>
        {children}
      </SkjemaGruppe>
    );
  }
}

export default RadioGruppe;
