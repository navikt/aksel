import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Ingress extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="ingress" {...this.props} />;
  }
}

export default Ingress;
