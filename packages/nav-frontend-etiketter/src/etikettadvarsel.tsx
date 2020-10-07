import * as React from "react";
import EtikettBase, { EtikettProps } from "./index";

class EtikettAdvarsel extends React.Component<EtikettProps> {
  render() {
    return <EtikettBase type="advarsel" {...this.props} />;
  }
}

export default EtikettAdvarsel;
