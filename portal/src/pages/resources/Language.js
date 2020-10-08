import React from "react";

import { Innholdstittel, Ingress } from "nav-frontend-typografi";

import TabbedContainer from "../../components/tabbed-container/TabbedContainer";

import "./language/styles.less";

class LanguagePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        label: "Prinsipper",
        path: "/resources/language/principles/",
      },
      {
        label: "Skriveråd",
        path: "/resources/language/guidelines/",
      },
      {
        label: "Sjekkliste",
        path: "/resources/language/checklist/",
      },
      {
        label: "Tall, tid og dato",
        path: "/resources/language/units/",
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
