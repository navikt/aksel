import * as React from "react";
import EtikettBase, { EtikettProps } from "./index";

class EtikettSuksess extends React.Component<EtikettProps> {
  render() {
    return <EtikettBase type="suksess" {...this.props} />;
  }
}

export default EtikettSuksess;
