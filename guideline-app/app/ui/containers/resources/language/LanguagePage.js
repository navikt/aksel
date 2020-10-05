import React from "react";

import {
  Innholdstittel,
  Ingress,
} from "NavFrontendModules/nav-frontend-typografi";

import Principles from "./tabs/Principles.mdx";
import Guidelines from "./tabs/Guidelines.mdx";
import Checklist from "./tabs/Checklist.mdx";
import Units from "./tabs/Units.mdx";

import MdxContent from "../../../components/mdx-content/MdxContent";
import TabbedContainer from "../../tabbed-container/TabbedContainer";

import "./styles.less";

class LanguagePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        label: "Prinsipper",
        content: () => <MdxContent>{Principles}</MdxContent>,
      },
      {
        id: "guidelines",
        label: "Skriveråd",
        content: () => <MdxContent>{Guidelines}</MdxContent>,
      },
      {
        id: "checklist",
        label: "Sjekkliste",
        content: () => <MdxContent>{Checklist}</MdxContent>,
      },
      {
        id: "units",
        label: "Tall, tid og dato",
        content: () => <MdxContent>{Units}</MdxContent>,
      },
    ];
  }

  render() {
    return (
      <React.Fragment>
        <Innholdstittel>Språk</Innholdstittel>
        <Ingress className="intro">
          Her finner du generelle tips og råd som er viktige for at flest mulig
          skal kunne finne og forstå teksten din.
        </Ingress>
        <TabbedContainer tabs={this.tabs} {...this.props} />
      </React.Fragment>
    );
  }
}

export default LanguagePage;
