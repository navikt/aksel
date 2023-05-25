import {
  ChevronDownIcon,
  ExternalLinkIcon,
  MenuGridIcon,
} from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Detail } from "@navikt/ds-react";
import { Meta } from "@storybook/react";
import React from "react";
import { InternalHeader, Dropdown } from "..";

export default {
  title: "ds-react-internal/InternalHeader",
  component: InternalHeader,
  argTypes: {
    user: {
      control: {
        type: "radio",
        options: ["simple", "with description", "with dropdown"],
      },
    },
  },
} as Meta;

export const Default = {
  render: (props) => {
    return (
      <InternalHeader style={{ width: 600 }}>
        {props?.titleAsHeading ? (
          <InternalHeader.Title as="h1">Tittel</InternalHeader.Title>
        ) : (
          <InternalHeader.Title href="/#home">
            Tittel med lenke
          </InternalHeader.Title>
        )}
        {props.systemMenu && (
          <Dropdown>
            <InternalHeader.Button
              as={Dropdown.Toggle}
              style={{ marginLeft: "auto" }}
            >
              <MenuGridIcon
                style={{ fontSize: "1.5rem" }}
                title="MenuGridIconer og oppslagsverk"
              />
            </InternalHeader.Button>
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
          <InternalHeader.User
            name="Ola Normann"
            style={{ marginLeft: props.systemMenu ? "none" : "auto" }}
          />
        )}
        {props.user === "with description" && (
          <InternalHeader.User
            name="Ola Normann"
            description="0123456"
            style={{ marginLeft: props.systemMenu ? "none" : "auto" }}
          />
        )}
        {props.user === "with dropdown" && (
          <Dropdown>
            <InternalHeader.Button
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
            </InternalHeader.Button>
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
      </InternalHeader>
    );
  },

  args: {
    titleAsHeading: false,
    systemMenu: false,
  },
};

export const TitleAsHeading = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title as="h1">Tittel</InternalHeader.Title>
  </InternalHeader>
);

export const TitleAsLink = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
  </InternalHeader>
);

export const User = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
    <InternalHeader.User name="Ola Normann" style={{ marginLeft: "auto" }} />
  </InternalHeader>
);

export const UserWithDescription = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
    <InternalHeader.User
      name="Ola Normann"
      description="id: 123456"
      style={{ marginLeft: "auto" }}
    />
  </InternalHeader>
);

export const UserWithMenu = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
    <Dropdown>
      <InternalHeader.Button
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
      </InternalHeader.Button>
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
  </InternalHeader>
);

export const UserWithMenuGridIconMenu = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
    <Dropdown>
      <InternalHeader.Button
        as={Dropdown.Toggle}
        style={{ marginLeft: "auto" }}
      >
        <MenuGridIcon
          style={{ fontSize: "1.5rem" }}
          title="MenuGridIconer og oppslagsverk"
        />
      </InternalHeader.Button>
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
    <InternalHeader.User name="Ola Normann" description="id: 123456" />
  </InternalHeader>
);
