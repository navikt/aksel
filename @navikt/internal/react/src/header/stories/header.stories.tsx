import React, { useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import { Header } from "..";
import { Expand, System, ExternalLink } from "@navikt/ds-icons";
import { Divider, DropdownMenu } from "../..";

export default {
  title: "ds-react-internal/header",
  component: Header,
};

const SystemMenu = (props) => (
  <DropdownMenu {...props}>
    <Heading level="2" size="xsmall">
      Systemer og oppslagsverk
    </Heading>
    <DropdownMenu.List>
      <DropdownMenu.Item as="a" href="http://example.com" target="_blank">
        <span>A.Inntekt</span>
        <ExternalLink style={{ fontSize: "0.875rem" }} />
      </DropdownMenu.Item>
      <DropdownMenu.Item as="a" href="http://example.com" target="_blank">
        <span>Aa-registeret</span>
        <ExternalLink style={{ fontSize: "0.875rem" }} />
      </DropdownMenu.Item>
      <DropdownMenu.Item as="a" href="http://example.com" target="_blank">
        <span>Gosys</span>
        <ExternalLink style={{ fontSize: "0.875rem" }} />
      </DropdownMenu.Item>
    </DropdownMenu.List>
  </DropdownMenu>
);

const UserMenu = (props) => (
  <DropdownMenu {...props}>
    <BodyLong size="small">Kong Harald 16px</BodyLong>
    <Detail size="small">Ident nr 14px</Detail>
    <Detail size="small" style={{ marginBottom: 12 }}>
      Enhet: Skien
    </Detail>
    <Divider />
    <DropdownMenu.List>
      <DropdownMenu.Item as="a" href="/#settings">
        Innstillinger
      </DropdownMenu.Item>
      <DropdownMenu.Item onClick={() => console.log("logg ut")}>
        Logg ut
      </DropdownMenu.Item>
    </DropdownMenu.List>
  </DropdownMenu>
);

const Full = () => {
  const [systemAnchorEl, setSystemAnchorEl] = useState<Element | null>(null);
  const [isSystemOpen, setIsSystemOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = useState<Element | null>(null);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  return (
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.Button
        style={{ marginLeft: "auto" }}
        ref={(el) => setSystemAnchorEl(el)}
        onClick={() => setIsSystemOpen((isOpen) => !isOpen)}
      >
        <System style={{ fontSize: "1.5rem" }} />
      </Header.Button>
      <SystemMenu
        anchorEl={systemAnchorEl}
        open={isSystemOpen}
        onClose={() => setIsSystemOpen(false)}
      />
      <Header.Button
        ref={(el) => setUserAnchorEl(el)}
        onClick={() => setIsUserOpen((isOpen) => !isOpen)}
      >
        <BodyShort size="small">Kong Harald</BodyShort>
        <Expand />
      </Header.Button>
      <UserMenu
        anchorEl={userAnchorEl}
        open={isUserOpen}
        onClose={() => setIsUserOpen(false)}
      />
    </Header>
  );
};

const Initial = () => {
  const [systemAnchorEl, setSystemAnchorEl] = useState<Element | null>(null);
  const [isSystemOpen, setIsSystemOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = useState<Element | null>(null);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  return (
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.Button
        style={{ marginLeft: "auto" }}
        ref={(el) => setSystemAnchorEl(el)}
        onClick={() => setIsSystemOpen((isOpen) => !isOpen)}
      >
        <System style={{ fontSize: "1.5rem" }} />
      </Header.Button>
      <SystemMenu
        anchorEl={systemAnchorEl}
        open={isSystemOpen}
        onClose={() => setIsSystemOpen(false)}
      />
      <Header.Button
        ref={(el) => setUserAnchorEl(el)}
        onClick={() => setIsUserOpen((isOpen) => !isOpen)}
      >
        <div
          style={{
            background: "white",
            color: "var(--navds-color-darkgray)",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 28,
            width: 28,
          }}
        >
          <BodyShort>K</BodyShort>
        </div>
        <Expand />
      </Header.Button>
      <UserMenu
        anchorEl={userAnchorEl}
        open={isUserOpen}
        onClose={() => setIsUserOpen(false)}
      />
    </Header>
  );
};
const InitialWithChevron = () => {
  const [systemAnchorEl, setSystemAnchorEl] = useState<Element | null>(null);
  const [isSystemOpen, setIsSystemOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = useState<Element | null>(null);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  return (
    <Header>
      <Header.Title>NAV Sykepenger</Header.Title>
      <Header.Button
        style={{ marginLeft: "auto" }}
        ref={(el) => setSystemAnchorEl(el)}
        onClick={() => setIsSystemOpen((isOpen) => !isOpen)}
      >
        <System style={{ fontSize: "1.5rem" }} />
      </Header.Button>
      <SystemMenu
        anchorEl={systemAnchorEl}
        open={isSystemOpen}
        onClose={() => setIsSystemOpen(false)}
      />
      <Header.Button
        ref={(el) => setUserAnchorEl(el)}
        onClick={() => setIsUserOpen((isOpen) => !isOpen)}
      >
        <BodyShort>KH</BodyShort>
        <Expand />
      </Header.Button>
      <UserMenu
        anchorEl={userAnchorEl}
        open={isUserOpen}
        onClose={() => setIsUserOpen(false)}
      />
    </Header>
  );
};

export const Test = () => (
  <div
    style={{
      display: "grid",
      gap: 64,
    }}
  >
    <Full />
    <Initial />
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
