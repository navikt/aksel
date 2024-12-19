import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ChevronDownIcon,
  CogIcon,
  ExternalLinkIcon,
  LeaveIcon,
  MenuGridIcon,
} from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Detail, Spacer, VStack } from "@navikt/ds-react";
import { Dropdown } from "../dropdown";
import InternalHeader from "./InternalHeader";

export default {
  title: "ds-react/InternalHeader",
  component: InternalHeader,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof InternalHeader>;

type Story = StoryObj<typeof InternalHeader>;

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
                title="Systemer og oppslagsverk"
              />
            </InternalHeader.Button>
            <Dropdown.Menu strategy="fixed">
              <Dropdown.Menu.List>
                <Dropdown.Menu.List.Item>
                  <span>A.Inntekt</span>
                  <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item>
                  <span>Aa-registeret</span>
                  <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item>
                  <span>Gosys</span>
                  <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
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
              <ChevronDownIcon title="Brukermeny" />
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
                  Innstillinger <Spacer />{" "}
                  <CogIcon aria-hidden fontSize="1.5rem" />
                </Dropdown.Menu.List.Item>
                <Dropdown.Menu.List.Item onClick={() => console.log("logg ut")}>
                  Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
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
    user: "simple",
  },
  argTypes: {
    user: {
      control: { type: "radio" },
      options: ["simple", "with description", "with dropdown"],
    },
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
        <ChevronDownIcon title="Brukermeny" />
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
            Innstillinger <Spacer /> <CogIcon aria-hidden fontSize="1.5rem" />
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item onClick={() => console.log("logg ut")}>
            Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
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
          title="Systemer og oppslagsverk"
        />
      </InternalHeader.Button>
      <Dropdown.Menu strategy="fixed">
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>
            <span>A.Inntekt</span>
            <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>
            <span>Aa-registeret</span>
            <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>
            <span>Gosys</span>
            <ExternalLinkIcon aria-hidden fontSize="0.875rem" />
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
    <InternalHeader.User name="Ola Normann" description="id: 123456" />
  </InternalHeader>
);

export const UserButton = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
    <Spacer />
    <Dropdown>
      <InternalHeader.UserButton
        as={Dropdown.Toggle}
        name="Ola N."
        description="Enhet: Skien"
      />
      <Dropdown.Menu>
        <dl>
          <BodyShort as="dt" size="small">
            Ola Normann
          </BodyShort>
          <Detail as="dd">D123456</Detail>
        </dl>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>
            Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  </InternalHeader>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4">
      <div>
        <h2>TitleAsHeading</h2>
        <TitleAsHeading />
      </div>
      <div>
        <h2>TitleAsLink</h2>
        <TitleAsLink />
      </div>
      <div>
        <h2>User</h2>
        <User />
      </div>
      <div>
        <h2>UserWithDescription</h2>
        <UserWithDescription />
      </div>
      <div>
        <h2>UserWithMenu</h2>
        <UserWithMenu />
      </div>
      <div>
        <h2>UserWithMenuGridIconMenu</h2>
        <UserWithMenuGridIconMenu />
      </div>
      <div>
        <h2>UserButton</h2>
        <UserButton />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
