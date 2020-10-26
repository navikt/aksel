import * as React from "react";
import * as classNames from "classnames";
import { SkjemaGruppe, SkjemaGruppeProps } from ".";

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
