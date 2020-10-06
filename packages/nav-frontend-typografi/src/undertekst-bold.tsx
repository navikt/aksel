import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class UndertekstBold extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="undertekstBold" {...this.props} />;
  }
}

export default UndertekstBold;
