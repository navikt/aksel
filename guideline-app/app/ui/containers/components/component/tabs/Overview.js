import React from "react";
import MdxContent from "../../../../components/mdx-content/MdxContent";

class Overview extends React.Component {
  render() {
    if (this.props.textData.overview) {
      return (
        <MdxContent overview>{this.props.textData.overview.default}</MdxContent>
      );
    }

    return "Ingen informasjon.";
  }
}

export default Overview;
