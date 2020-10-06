import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class EtikettLiten extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="etikettLiten" {...this.props} />;
  }
}

export default EtikettLiten;
