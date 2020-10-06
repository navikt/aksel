import * as React from "react";
import Chevron, { NavFrontendChevronProps } from "./chevron";

class OppChevron extends React.Component<NavFrontendChevronProps> {
  render() {
    return <Chevron {...this.props} type="opp" />;
  }
}

(OppChevron as React.ComponentClass).propTypes = {};

export default OppChevron;
