import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { Header } from "..";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

export const All = () => (
  <div>
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.User name="Kong Harald" ident="D123456" />
    </Header>

    <h1>Uten innhold</h1>
    <Header />

    <h1>Title</h1>
    <Header>
      <Header.Title>Tittel</Header.Title>
    </Header>

    <h1>Title but not heading</h1>
    <Header>
      <Header.Title element="span">Tittel</Header.Title>
    </Header>

    <h1>Title with link</h1>
    <Header>
      <Header.Title>
        <a href="/#">Tittel med lenke</a>
      </Header.Title>
    </Header>

    <h1>Title with react-router link</h1>
    <Router>
      <Header>
        <Header.Title>
          <Link to="/">Tittel med lenke</Link>
        </Header.Title>
      </Header>
    </Router>

    <h1>Title + User</h1>
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.User name="Kong Harald" ident="D123456" />
    </Header>
  </div>
);
