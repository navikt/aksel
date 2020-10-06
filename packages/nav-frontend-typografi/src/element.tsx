import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Element extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="element" {...this.props} />;
  }
}

export default Element;
