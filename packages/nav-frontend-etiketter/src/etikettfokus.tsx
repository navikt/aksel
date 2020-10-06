import * as React from "react";
import EtikettBase, { EtikettProps } from "./index";

class EtikettFokus extends React.Component<EtikettProps> {
  render() {
    return <EtikettBase type="fokus" {...this.props} />;
  }
}

export default EtikettFokus;
