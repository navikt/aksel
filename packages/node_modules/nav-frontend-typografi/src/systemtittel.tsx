import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Systemtittel extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="systemtittel" {...this.props} />;
  }
}

export default Systemtittel;
