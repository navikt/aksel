import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Feilmelding extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="feilmelding" {...this.props} />;
  }
}

export default Feilmelding;
