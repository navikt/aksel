import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Innholdstittel extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="innholdstittel" {...this.props} />;
  }
}

export default Innholdstittel;
