import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Sidetittel extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="sidetittel" {...this.props} />;
  }
}

export default Sidetittel;
