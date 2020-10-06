import * as React from "react";
import KnappBase, { KnappBaseProps } from "./index";

class Flatknapp extends React.Component<KnappBaseProps> {
  render() {
    return <KnappBase type="flat" {...this.props} />;
  }
}

export default Flatknapp;
