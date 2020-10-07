import * as React from "react";
import KnappBase, { KnappBaseProps } from "./index";

class Hovedknapp extends React.Component<KnappBaseProps> {
  render() {
    return <KnappBase {...this.props} type="hoved" />;
  }
}

export default Hovedknapp;
