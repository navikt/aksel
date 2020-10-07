import React from "react";

// import { Innholdstittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';

import Grid from "./tabs/Grid.mdx";
import Spacing from "./tabs/Spacing.mdx";

import MdxContent from "../../../components/mdx-content/MdxContent";
// import TabbedContainer from './../../tabbed-container/TabbedContainer';

class LayoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        label: "Grid",
        content: () => <MdxContent>{Grid}</MdxContent>,
      },
      {
        id: "spacing",
        label: "Avstand",
        content: () => <MdxContent>{Spacing}</MdxContent>,
      },
    ];
  }

  render() {
    return (
      <React.Fragment>
        {/* <Innholdstittel>Layout</Innholdstittel> */}
        <MdxContent>{Grid}</MdxContent>
        {/* <TabbedContainer tabs={this.tabs} {...this.props} /> */}
      </React.Fragment>
    );
  }
}

export default LayoutPage;
