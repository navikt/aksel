import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React from "react";
import { Alert, AlertProps } from ".";
import { BodyLong, Heading as DsHeading, Link, Provider, VStack } from "..";
import enGB from "../locales/enGB.json";

const meta: Meta<typeof Alert> = {
  title: "ds-react/Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

const variants: AlertProps["variant"][] = [
  "error",
  "warning",
  "info",
  "success",
];

export const Default: Story = {
  render: (props) => <Alert {...props} />,

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    fullWidth: false,
    variant: "info",
    size: "medium",
    closeButton: false,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["info", "error", "warning", "success"],
    },
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
  },
};

export const Small: Story = {
  render: (props) => {
    return (
      <div className="colgap">
        {variants.map((variant, i) => (
          <Alert
            key={variant}
            variant={variant}
            size="small"
            closeButton={props.closeButton}
          >
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert>
        ))}
      </div>
    );
  },

  args: {
    closeButton: false,
  },
};

export const FullWidth = () => {
  return (
    <div className="colgap">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} fullWidth>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} fullWidth size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
    </div>
  );
};

export const Inline = () => {
  return (
    <div className="colgap">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} inline>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} inline size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
    </div>
  );
};

export const Heading = () => {
  return (
    <div className="colgap">
      <Alert variant="info">
        <DsHeading spacing size="small" level="3">
          Aliquip duis est in commodo pariatur
        </DsHeading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
      <Alert variant="info" size="small">
        <DsHeading spacing size="xsmall" level="3">
          Aliquip duis est in commodo pariatur
        </DsHeading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
    </div>
  );
};

export const Links = () => {
  return (
    <div className="colgap">
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <Link href="#">Id elit esse enim reprehenderit</Link>
        </Alert>
      ))}
    </div>
  );
};

const AlertWithCloseButton = ({
  children,
  size,
}: {
  size?: "medium" | "small";
  children?: React.ReactNode;
}) => {
  const [show, setShow] = React.useState(true);

  return show ? (
    <Alert
      variant="warning"
      size={size}
      closeButton
      onClose={() => setShow(false)}
    >
      {children || "Content"}
    </Alert>
  ) : null;
};

export const WithCloseButton: Story = {
  render: () => {
    return (
      <div className="colgap">
        <AlertWithCloseButton />
        <AlertWithCloseButton>
          <BodyLong>Ullamco ullamco laborum et commodo sint culpa</BodyLong>
        </AlertWithCloseButton>
        <AlertWithCloseButton>
          <DsHeading spacing size="small" level="3">
            Aliquip duis est in commodo pariatur
          </DsHeading>
          <BodyLong>
            Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
            laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
            sint commodo consequat eu aute.
          </BodyLong>
        </AlertWithCloseButton>
        <AlertWithCloseButton size="small">
          <BodyLong>Ullamco ullamco laborum et commodo</BodyLong>
        </AlertWithCloseButton>
        <AlertWithCloseButton size="small">
          <DsHeading spacing size="small" level="3">
            Aliquip duis est in commodo pariatur
          </DsHeading>
          <BodyLong>
            Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
            laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
            sint commodo consequat eu aute.
          </BodyLong>
        </AlertWithCloseButton>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByTitle("Lukk Alert");

    await step("click button", async () => {
      await userEvent.click(buttons[0]);
    });

    const buttonsAfter = canvas.getAllByTitle("Lukk Alert");
    expect(buttonsAfter.length).toBe(4);
  },
};

export const I18n = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <h1>Inspect svg title for translations</h1>
        </div>
        <div>
          <h2>Default global translation (nb)</h2>
          <Alert variant="info">Lorem ipsum dolor sit amet</Alert>
          <Alert variant="warning">Lorem ipsum dolor sit amet</Alert>
        </div>
        <div>
          <h2>Provider translation (enGB)</h2>
          <Provider i18n={enGB}>
            <Alert variant="info">Lorem ipsum dolor sit amet</Alert>
            <Alert variant="warning">Lorem ipsum dolor sit amet</Alert>
          </Provider>
        </div>
        <div>
          <h2>Global + local translation</h2>
          <Alert variant="info">Default global (nb)</Alert>
          <Alert
            variant="warning"
            translations={{
              iconTitle: {
                warning: "Custom warning text based on context or state",
              },
            }}
          >
            {`translations={{
              iconTitle: {
                warning: "Custom warning text based on context or state",
              },
            }}`}
          </Alert>
        </div>
        <div>
          <h2>Custom global translation + default </h2>
          <Provider
            i18n={[
              {
                Aksel: {
                  Alert: {
                    iconTitle: {
                      warning: "Custom language override merged with global",
                    },
                  },
                },
              },
              enGB,
            ]}
          >
            <Alert variant="info">Default global (enGB)</Alert>
            <Alert variant="warning">Custom global</Alert>
          </Provider>
        </div>
      </VStack>
    );
  },
};
