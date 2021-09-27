import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { Header, HeaderTitle, HeaderUser } from "../index";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

export const All = () => (
  <div>
    <Header>
      <HeaderTitle>NAV Sykepenger</HeaderTitle>
      <HeaderUser name="Kong Harald" ident="D123456" />
    </Header>

    <h1>Uten innhold</h1>
    <Header />

    <h1>Title</h1>
    <Header>
      <HeaderTitle>Tittel</HeaderTitle>
    </Header>

    <h1>Title but not heading</h1>
    <Header>
      <HeaderTitle element="span">Tittel</HeaderTitle>
    </Header>

    <h1>Title with link</h1>
    <Header>
      <HeaderTitle>
        <a href="/#">Tittel med lenke</a>
      </HeaderTitle>
    </Header>

    <h1>Title with react-router link</h1>
    <Router>
      <Header>
        <HeaderTitle>
          <Link to="/">Tittel med lenke</Link>
        </HeaderTitle>
      </Header>
    </Router>

    <h1>Title + User</h1>
    <Header>
      <HeaderTitle>NAV Sykepenger</HeaderTitle>
      <HeaderUser name="Kong Harald" ident="D123456" />
    </Header>
  </div>
);
