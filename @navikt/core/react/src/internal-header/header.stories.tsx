import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  ChevronDownIcon,
  CogIcon,
  ExternalLinkIcon,
  LeaveIcon,
  MenuGridIcon,
} from "@navikt/aksel-icons";
import {
  ActionMenu,
  BodyLong,
  BodyShort,
  Detail,
  Spacer,
  VStack,
} from "@navikt/ds-react";
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
          <ActionMenu>
            <ActionMenu.Trigger>
              <InternalHeader.Button style={{ marginLeft: "auto" }}>
                <MenuGridIcon
                  style={{ fontSize: "1.5rem" }}
                  title="Systemer og oppslagsverk"
                />
              </InternalHeader.Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content align="end">
              <ActionMenu.Group aria-label="Systemer og oppslagsverk">
                <ActionMenu.Item
                  icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
                >
                  <span>A.Inntekt</span>
                </ActionMenu.Item>
                <ActionMenu.Item
                  icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
                >
                  <span>Aa-registeret</span>
                </ActionMenu.Item>
                <ActionMenu.Item
                  icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
                >
                  <span>Gosys</span>
                </ActionMenu.Item>
              </ActionMenu.Group>
            </ActionMenu.Content>
          </ActionMenu>
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
          <ActionMenu>
            <ActionMenu.Trigger>
              <InternalHeader.Button
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
            </ActionMenu.Trigger>
            <ActionMenu.Content align="end">
              <ActionMenu.Label>
                <dl style={{ margin: "0" }}>
                  <BodyLong size="small" as="dt">
                    Ola Normann 16px
                  </BodyLong>
                  <Detail size="small" as="dd">
                    <div>Ident nr 14px</div>
                    <div>Enhet: Skien</div>
                  </Detail>
                </dl>
              </ActionMenu.Label>
              <ActionMenu.Divider />
              <ActionMenu.Group aria-label="Handlinger">
                <ActionMenu.Item
                  as="a"
                  href="/#settings"
                  icon={<CogIcon aria-hidden fontSize="1.5rem" />}
                >
                  Innstillinger
                </ActionMenu.Item>
                <ActionMenu.Item
                  onClick={() => console.log("logg ut")}
                  icon={<LeaveIcon aria-hidden fontSize="1.5rem" />}
                >
                  Logg ut
                </ActionMenu.Item>
              </ActionMenu.Group>
            </ActionMenu.Content>
          </ActionMenu>
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
    <ActionMenu>
      <ActionMenu.Trigger>
        <InternalHeader.Button
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
      </ActionMenu.Trigger>
      <ActionMenu.Content align="end">
        <ActionMenu.Label>
          <dl style={{ margin: "0" }}>
            <BodyLong size="small" as="dt">
              Ola Normann 16px
            </BodyLong>
            <Detail size="small" as="dd">
              <div>Ident nr 14px</div>
              <div>Enhet: Skien</div>
            </Detail>
          </dl>
        </ActionMenu.Label>
        <ActionMenu.Divider />
        <ActionMenu.Group aria-label="Handlinger">
          <ActionMenu.Item
            as="a"
            href="/#settings"
            icon={<CogIcon aria-hidden fontSize="1.5rem" />}
          >
            Innstillinger
          </ActionMenu.Item>
          <ActionMenu.Item
            onClick={() => console.log("logg ut")}
            icon={<LeaveIcon aria-hidden fontSize="1.5rem" />}
          >
            Logg ut
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  </InternalHeader>
);

export const UserWithMenuGridIconMenu = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
    <ActionMenu>
      <ActionMenu.Trigger>
        <InternalHeader.Button style={{ marginLeft: "auto" }}>
          <MenuGridIcon
            style={{ fontSize: "1.5rem" }}
            title="Systemer og oppslagsverk"
          />
        </InternalHeader.Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group aria-label="Systemer og oppslagsverk">
          <ActionMenu.Item
            icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
          >
            <span>A.Inntekt</span>
          </ActionMenu.Item>
          <ActionMenu.Item
            icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
          >
            <span>Aa-registeret</span>
          </ActionMenu.Item>
          <ActionMenu.Item
            icon={<ExternalLinkIcon aria-hidden fontSize="0.875rem" />}
          >
            <span>Gosys</span>
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
    <InternalHeader.User name="Ola Normann" description="id: 123456" />
  </InternalHeader>
);

export const UserButton = () => (
  <InternalHeader style={{ width: 600 }}>
    <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
    <Spacer />
    <ActionMenu>
      <ActionMenu.Trigger>
        <InternalHeader.UserButton name="Ola N." description="Enhet: Skien" />
      </ActionMenu.Trigger>
      <ActionMenu.Content align="end">
        <ActionMenu.Label>
          <dl style={{ margin: "0" }}>
            <BodyShort as="dt" size="small">
              Ola Normann
            </BodyShort>
            <Detail as="dd">D123456</Detail>
          </dl>
        </ActionMenu.Label>
        <ActionMenu.Divider />
        <ActionMenu.Group aria-label="Handlinger">
          <ActionMenu.Item
            onClick={() => console.log("logg ut")}
            icon={<LeaveIcon aria-hidden fontSize="1.5rem" />}
          >
            Logg ut
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  </InternalHeader>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="space-16">
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
