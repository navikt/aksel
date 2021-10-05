import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import { Header } from "..";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

export const Test = () => (
  <Header>
    <Header.Title>NAV Sykepenger</Header.Title>
    <Header.DropdownMenu>
      <Heading level="2" size="xsmall">
        Systemer og oppslagsverk
      </Heading>
      <Header.DropdownMenu.Item
        as="a"
        href="http://example.com"
        target="_blank"
      >
        A.Inntekt
      </Header.DropdownMenu.Item>
      <Header.DropdownMenu.Item
        as="a"
        href="http://example.com"
        target="_blank"
      >
        Aa-registeret
      </Header.DropdownMenu.Item>
      <Header.DropdownMenu.Item
        as="a"
        href="http://example.com"
        target="_blank"
      >
        Gosys
      </Header.DropdownMenu.Item>
    </Header.DropdownMenu>
    <Header.UserMenu name="Kong Harald" ident="D123456">
      <Header.UserMenu.Item as="a" href="/#settings">
        Innstillinger
      </Header.UserMenu.Item>
      <Header.UserMenu.Item onClick={() => console.log("logg ut")}>
        Logg ut
      </Header.UserMenu.Item>
    </Header.UserMenu>
  </Header>
);

export const All = () => (
  <div>
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.UserMenu name="Kong Harald" ident="D123456">
        <Header.UserMenu.Item as="a" href="/#settings">
          Innstillinger
        </Header.UserMenu.Item>
        <Header.UserMenu.Item onClick={() => console.log("logg ut")}>
          Logg ut
        </Header.UserMenu.Item>
      </Header.UserMenu>
    </Header>

    <h1>Uten innhold</h1>
    <Header />

    <h1>Title</h1>
    <Header>
      <Header.Title>Tittel</Header.Title>
    </Header>

    <h1>Title as span</h1>
    <Header>
      <Header.Title as="span">Tittel</Header.Title>
    </Header>

    <h1>Title as link</h1>
    <Header>
      <Header.Title as="a" href="/#home">
        Tittel med lenke
      </Header.Title>
    </Header>

    <h1>Title as react-router link</h1>
    <Router>
      <Header>
        <Header.Title as={Link} to="/home">
          Tittel med lenke
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
