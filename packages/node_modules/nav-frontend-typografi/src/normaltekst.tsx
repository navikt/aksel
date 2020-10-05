import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Normaltekst extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="normaltekst" {...this.props} />;
  }
}

export default Normaltekst;
