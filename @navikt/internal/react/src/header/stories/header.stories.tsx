import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import { Header } from "..";
import { Expand, System, ExternalLink } from "@navikt/ds-icons";
import { Divider } from "../..";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

const Full = () => (
  <Header>
    <Header.Title>NAV Sykepenger</Header.Title>
    <Header.Dropdown>
      <Header.Dropdown.Button style={{ marginLeft: "auto" }}>
        <System style={{ fontSize: "1.5rem" }} />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <Heading level="2" size="xsmall">
          Systemer og oppslagsverk
        </Heading>
        <Header.Dropdown.Menu.List>
          <Header.Dropdown.Menu.Item>
            <span>A.Inntekt</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item>
            <span>Aa-registeret</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item>
            <span>Gosys</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
        </Header.Dropdown.Menu.List>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
    <Header.Dropdown>
      <Header.Dropdown.Button>
        <BodyShort size="small">Kong Harald</BodyShort>
        <Expand />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <BodyLong size="small">Kong Harald 16px</BodyLong>
        <Detail size="small">Ident nr 14px</Detail>
        <Detail size="small" style={{ marginBottom: 12 }}>
          Enhet: Skien
        </Detail>
        <Divider />
        <Header.Dropdown.Menu.List>
          <Header.Dropdown.Menu.Item as="a" href="/#settings">
            Innstillinger
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item onClick={() => console.log("logg ut")}>
            Logg ut
          </Header.Dropdown.Menu.Item>
        </Header.Dropdown.Menu.List>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
  </Header>
);

const InitialWithChevron = () => (
  <Header>
    <Header.Title>NAV Sykepenger</Header.Title>
    <Header.Dropdown>
      <Header.Dropdown.Button style={{ marginLeft: "auto" }}>
        <System style={{ fontSize: "1.5rem" }} />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <Heading level="2" size="xsmall">
          Systemer og oppslagsverk
        </Heading>
        <Header.Dropdown.Menu.List>
          <Header.Dropdown.Menu.Item>
            <span>A.Inntekt</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item>
            <span>Aa-registeret</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item>
            <span>Gosys</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.Item>
        </Header.Dropdown.Menu.List>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
    <Header.Dropdown>
      <Header.Dropdown.Button>
        <BodyShort>KH</BodyShort>
        <Expand />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <BodyLong size="small">Kong Harald 16px</BodyLong>
        <Detail size="small">Ident nr 14px</Detail>
        <Detail size="small" style={{ marginBottom: 12 }}>
          Enhet: Skien
        </Detail>
        <Divider />
        <Header.Dropdown.Menu.List>
          <Header.Dropdown.Menu.Item as="a" href="/#settings">
            Innstillinger
          </Header.Dropdown.Menu.Item>
          <Header.Dropdown.Menu.Item onClick={() => console.log("logg ut")}>
            Logg ut
          </Header.Dropdown.Menu.Item>
        </Header.Dropdown.Menu.List>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
  </Header>
);

export const Test = () => (
  <div
    style={{
      display: "grid",
      gap: 64,
    }}
  >
    <Full />
    <InitialWithChevron />
  </div>
);

export const All = () => (
  <div>
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
