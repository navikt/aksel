import * as React from "react";
import KnappBase, { KnappBaseProps } from "./index";

class Knapp extends React.Component<KnappBaseProps> {
  render() {
    return <KnappBase type="standard" {...this.props} />;
  }
}

export default Knapp;
