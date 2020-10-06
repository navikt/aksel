import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Undertekst extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="undertekst" {...this.props} />;
  }
}

export default Undertekst;
