import {
  ChevronDownIcon,
  ExternalLinkIcon,
  MenuGridIcon,
} from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Detail } from "@navikt/ds-react";
import { Meta } from "@storybook/react";
import React from "react";
import { Header, Dropdown } from "..";

export default {
  title: "ds-react-internal/Header",
  component: Header,
  argTypes: {
    user: {
      control: {
        type: "radio",
        options: ["simple", "with description", "with dropdown"],
      },
    },
    /* size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    }, */
  },
} as Meta;

export const Default = {
  render: (props) => {
    return (
      <Header style={{ width: 600 }}>
        {props?.titleAsHeading ? (
          <Header.Title as="h1">Tittel</Header.Title>
        ) : (
          <Header.Title href="/#home">Tittel med lenke</Header.Title>
        )}
        {props.systemMenu && (
          <Dropdown>
            <Header.Button as={Dropdown.Toggle} style={{ marginLeft: "auto" }}>
              <MenuGridIcon
                style={{ fontSize: "1.5rem" }}
                title="MenuGridIconer og oppslagsverk"
              />
            </Header.Button>
            <Dropdown.Menu strategy="fixed">
              <Dropdown.Menu.List>
                <Dropdown.Menu.List.Item>
                  <span>A.Inntekt</span>
                  <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item>
                  <span>Aa-registeret</span>
                  <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item>
                  <span>Gosys</span>
                  <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
                </Dropdown.Menu.List.Item>
              </Dropdown.Menu.List>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {(!props.user || props.user === "simple") && (
          <Header.User
            name="Ola Normann"
            style={{ marginLeft: props.systemMenu ? "none" : "auto" }}
          />
        )}
        {props.user === "with description" && (
          <Header.User
            name="Ola Normann"
            description="0123456"
            style={{ marginLeft: props.systemMenu ? "none" : "auto" }}
          />
        )}
        {props.user === "with dropdown" && (
          <Dropdown>
            <Header.Button
              as={Dropdown.Toggle}
              style={{
                marginLeft: props.systemMenu ? "none" : "auto",
                paddingRight: "1.5rem",
                paddingLeft: "1.5rem",
                gap: "1rem",
              }}
            >
              <BodyShort title="Ola Normann">KH</BodyShort>
              <ChevronDownIcon />
            </Header.Button>
            <Dropdown.Menu strategy="fixed">
              <div>
                <BodyLong size="small" as="div">
                  Ola Normann 16px
                </BodyLong>
                <Detail size="small" as="div">
                  <div>Ident nr 14px</div>
                  <div>Enhet: Skien</div>
                </Detail>
              </div>
              <Dropdown.Menu.Divider />
              <Dropdown.Menu.List>
                <Dropdown.Menu.List.Item as="a" href="/#settings">
                  Innstillinger
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item onClick={() => console.log("logg ut")}>
                  Logg ut
                </Dropdown.Menu.List.Item>
              </Dropdown.Menu.List>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Header>
    );
  },

  args: {
    titleAsHeading: false,
    systemMenu: false,
  },
};

export const TitleAsHeading = () => (
  <Header style={{ width: 600 }}>
    <Header.Title as="h1">Tittel</Header.Title>
  </Header>
);

export const TitleAsLink = () => (
  <Header style={{ width: 600 }}>
    <Header.Title href="/#home">Tittel med lenke</Header.Title>
  </Header>
);

export const User = () => (
  <Header style={{ width: 600 }}>
    <Header.Title href="/#home">Tittel med lenke</Header.Title>
    <Header.User name="Ola Normann" style={{ marginLeft: "auto" }} />
  </Header>
);

export const UserWithDescription = () => (
  <Header style={{ width: 600 }}>
    <Header.Title href="/#home">Tittel med lenke</Header.Title>
    <Header.User
      name="Ola Normann"
      description="id: 123456"
      style={{ marginLeft: "auto" }}
    />
  </Header>
);

export const UserWithMenu = () => (
  <Header style={{ width: 600 }}>
    <Header.Title href="/#home">Tittel med lenke</Header.Title>
    <Dropdown>
      <Header.Button
        as={Dropdown.Toggle}
        style={{
          marginLeft: "auto",
          paddingRight: "1.5rem",
          paddingLeft: "1.5rem",
          gap: "1rem",
        }}
      >
        <BodyShort title="Ola Normann">KH</BodyShort>
        <ChevronDownIcon />
      </Header.Button>
      <Dropdown.Menu strategy="fixed">
        <div>
          <BodyLong size="small" as="div">
            Ola Normann 16px
          </BodyLong>
          <Detail size="small" as="div">
            <div>Ident nr 14px</div>
            <div>Enhet: Skien</div>
          </Detail>
        </div>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item as="a" href="/#settings">
            Innstillinger
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item onClick={() => console.log("logg ut")}>
            Logg ut
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  </Header>
);

export const UserWithMenuGridIconMenu = () => (
  <Header style={{ width: 600 }}>
    <Header.Title href="/#home">Tittel med lenke</Header.Title>
    <Dropdown>
      <Header.Button as={Dropdown.Toggle} style={{ marginLeft: "auto" }}>
        <MenuGridIcon
          style={{ fontSize: "1.5rem" }}
          title="MenuGridIconer og oppslagsverk"
        />
      </Header.Button>
      <Dropdown.Menu strategy="fixed">
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>
            <span>A.Inntekt</span>
            <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>
            <span>Aa-registeret</span>
            <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>
            <span>Gosys</span>
            <ExternalLinkIcon style={{ fontSize: "0.875rem" }} />
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
    <Header.User name="Ola Normann" description="id: 123456" />
  </Header>
);
