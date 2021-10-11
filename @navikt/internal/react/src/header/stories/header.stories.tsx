import React from "react";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import { Header } from "..";
import { Expand, System, ExternalLink } from "@navikt/ds-icons";
import { Divider } from "../..";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

export const All = () => (
  <>
    <Heading level="1" size="xlarge">
      Header for interne flater
    </Heading>

    <Heading level="2" size="medium">
      Title
    </Heading>
    <Header>
      <Header.Title href="/#home">Tittel med lenke</Header.Title>
    </Header>

    <Heading level="2" size="medium">
      Title as h1
    </Heading>
    <Header>
      <Header.Title as="h1">Tittel</Header.Title>
    </Header>

    <Heading level="2" size="medium">
      User
    </Heading>
    <Header>
      <Header.Title href="/#home">NAV Sykepenger</Header.Title>
      <Header.User name="Kong Harald" style={{ marginLeft: "auto" }} />
    </Header>

    <Heading level="2" size="medium">
      User with description
    </Heading>
    <Header>
      <Header.Title href="/#home">NAV Sykepenger</Header.Title>
      <Header.Dropdown>
        <Header.Dropdown.Button style={{ marginLeft: "auto" }}>
          <System
            style={{ fontSize: "1.5rem" }}
            title="Systemer og oppslagsverk"
          />
        </Header.Dropdown.Button>
        <Header.Dropdown.Menu>
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
      <Header.User name="Kong Harald" description="D123456" />
    </Header>

    <Heading level="2" size="medium">
      Systems and user menu
    </Heading>
    <Full />

    <Heading level="2" size="medium">
      Initials
    </Heading>
    <Initials />
  </>
);

const Full = () => (
  <Header>
    <Header.Title href="/#home">NAV Sykepenger</Header.Title>
    <Header.Dropdown>
      <Header.Dropdown.Button style={{ marginLeft: "auto" }}>
        <System
          style={{ fontSize: "1.5rem" }}
          title="Systemer og oppslagsverk"
        />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <Header.Dropdown.Menu.DescriptionList>
          <Header.Dropdown.Menu.DescriptionTerm>
            Systemer og oppslagsverk
          </Header.Dropdown.Menu.DescriptionTerm>
          <Header.Dropdown.Menu.DescriptionDetail>
            <span>A.Inntekt</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.DescriptionDetail>
          <Header.Dropdown.Menu.DescriptionDetail>
            <span>Aa-registeret</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.DescriptionDetail>
          <Header.Dropdown.Menu.DescriptionDetail>
            <span>Gosys</span>
            <ExternalLink style={{ fontSize: "0.875rem" }} />
          </Header.Dropdown.Menu.DescriptionDetail>
        </Header.Dropdown.Menu.DescriptionList>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
    <Header.Dropdown>
      <Header.Dropdown.UserButton
        name="Kong Harald"
        description="Enhet: Skien"
      />
      <Header.Dropdown.Menu>
        <Header.Dropdown.Menu.List>
          <Header.Dropdown.Menu.Item onClick={() => console.log("logg ut")}>
            Logg ut
          </Header.Dropdown.Menu.Item>
        </Header.Dropdown.Menu.List>
      </Header.Dropdown.Menu>
    </Header.Dropdown>
  </Header>
);

const Initials = () => (
  <Header>
    <Header.Title href="/#home">NAV Sykepenger</Header.Title>
    <Header.Dropdown>
      <Header.Dropdown.Button style={{ marginLeft: "auto" }}>
        <BodyShort size="small" title="Kong Harald">
          KH
        </BodyShort>
        <Expand />
      </Header.Dropdown.Button>
      <Header.Dropdown.Menu>
        <div>
          <BodyLong size="small" as="div">
            Kong Harald 16px
          </BodyLong>
          <Detail size="small" as="div">
            <div>Ident nr 14px</div>
            <div>Enhet: Skien</div>
          </Detail>
        </div>
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
