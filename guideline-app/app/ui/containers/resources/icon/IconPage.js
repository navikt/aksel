import React from "react";

import {
  Innholdstittel,
  Ingress,
} from "NavFrontendModules/nav-frontend-typografi";

import Resources from "./tabs/Resources.mdx";
import Guidelines from "./tabs/Guidelines.mdx";

import MdxContent from "../../../components/mdx-content/MdxContent";
import TabbedContainer from "../../tabbed-container/TabbedContainer";

class IconPage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        label: "Ressurser",
        content: () => <MdxContent>{Resources}</MdxContent>,
      },
      {
        id: "guidelines",
        label: "Retningslinjer",
        content: () => <MdxContent>{Guidelines}</MdxContent>,
      },
    ];
  }

  render() {
    return (
      <React.Fragment>
        <Innholdstittel>Ikoner</Innholdstittel>
        <Ingress className="intro">NAV bruker Streamline Icons v.2.5.</Ingress>
        <TabbedContainer tabs={this.tabs} {...this.props} />
      </React.Fragment>
    );
  }
}

export default IconPage;
