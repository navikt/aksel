import * as React from "react";
import EtikettBase, { EtikettProps } from "./index";

class EtikettInfo extends React.Component<EtikettProps> {
  render() {
    return <EtikettBase type="info" {...this.props} />;
  }
}

export default EtikettInfo;
