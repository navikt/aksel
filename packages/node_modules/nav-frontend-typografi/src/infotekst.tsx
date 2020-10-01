import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Infotekst extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="infotekst" {...this.props} />;
  }
}

export default Infotekst;
