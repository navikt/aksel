import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Alert } from ".";
import { BodyLong, Heading as DsHeading, Link } from "..";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Alert> = {
  title: "ds-react/Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

const variants: Array<"error" | "warning" | "info" | "success"> = [
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
      control: {
        type: "radio",
      },
      options: ["info", "error", "warning", "success"],
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small"],
    },
    closeButton: {
      type: "boolean",
    },
  },
};

export const Small = {
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
  argtypes: {
    closeButton: {
      type: "boolean",
    },
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
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant}>
          <Link href="#">Id elit esse enim reprehenderit</Link>
        </Alert>
      ))}
    </div>
  );
};

const AlertWithCloseButton = ({ children }: { children?: React.ReactNode }) => {
  let [show, setShow] = React.useState(true);

  return show ? (
    <Alert variant="success" closeButton onClose={() => setShow(false)}>
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
          <BodyLong>
            Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
            laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
            sint commodo consequat eu aute.
          </BodyLong>
          <Link href="#">Id elit esse enim reprehenderit</Link>
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
    expect(buttonsAfter.length).toBe(2);
  },
};
