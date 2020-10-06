import * as React from "react";
import Chevron, { NavFrontendChevronProps } from "./chevron";

class NedChevron extends React.Component<NavFrontendChevronProps> {
  render() {
    return <Chevron {...this.props} type="ned" />;
  }
}

(NedChevron as React.ComponentClass).propTypes = {};

export default NedChevron;
