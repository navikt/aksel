import React from "react";

import {
  Innholdstittel,
  Ingress,
} from "NavFrontendModules/nav-frontend-typografi";

import Resources from "./tabs/Resources.mdx";
import Guidelines from "./tabs/Guidelines.mdx";
// import Accessibility from './tabs/Accessibility.mdx';

import MdxContent from "../../../components/mdx-content/MdxContent";
import TabbedContainer from "../../tabbed-container/TabbedContainer";

import "./styles.less";

class IllustrationPage extends React.Component {
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
    /*
            {
                id: 'accessibility',
                label: 'Tilgjengelighet',
                content: () => (<MdxContent>{Accessibility}</MdxContent>)
            }
        */
  }

  render() {
    return (
      <React.Fragment>
        <Innholdstittel>Illustrasjoner</Innholdstittel>
        <Ingress className="intro">
          Det er utviklet et eget illustrasjonsbibliotek for NAV, som er mulig å
          bruke for alle ansatte i etaten. Her kan du laste ned hele biblioteket
          og se hvilke retningslinjer som gjelder for bruk.
        </Ingress>
        <TabbedContainer tabs={this.tabs} {...this.props} />
      </React.Fragment>
    );
  }
}

export default IllustrationPage;
