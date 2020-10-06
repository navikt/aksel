import * as React from "react";
import Chevron, { NavFrontendChevronProps } from "./chevron";

class VenstreChevron extends React.Component<NavFrontendChevronProps> {
  render() {
    return <Chevron {...this.props} type="venstre" />;
  }
}

(VenstreChevron as React.ComponentClass).propTypes = {};

export default VenstreChevron;
