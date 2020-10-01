import * as React from "react";
import KnappBase, { KnappBaseProps } from "./index";

class Fareknapp extends React.Component<KnappBaseProps> {
  render() {
    return <KnappBase {...this.props} type="fare" />;
  }
}

export default Fareknapp;
