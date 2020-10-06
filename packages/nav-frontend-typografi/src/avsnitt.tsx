import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Avsnitt extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="avsnitt" {...this.props} />;
  }
}

export default Avsnitt;
