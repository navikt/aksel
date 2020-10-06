import * as React from "react";
import Chevron, { NavFrontendChevronProps } from "./chevron";

class HoyreChevron extends React.Component<NavFrontendChevronProps> {
  render() {
    return <Chevron {...this.props} type="høyre" />;
  }
}

(HoyreChevron as React.ComponentClass).propTypes = {};

export default HoyreChevron;
