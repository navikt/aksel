import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../layout/stack";
import { Link } from "../link";
import { BodyLong, Heading as DsHeading } from "../typography";
import Alert, { AlertProps } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "ds-react/Alert",
  component: Alert,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

const variants: AlertProps["variant"][] = [
  "error",
  "warning",
  "info",
  "success",
];

export const Controls: Story = {
  render: (props) => <Alert {...props} />,

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    fullWidth: false,
    inline: false,
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

export const Variants: Story = {
  render: () => (
    <div className="colgap">
      <h2>Variants</h2>
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant}>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
          )}
        </Alert>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <VStack gap="4">
      <h2>FullWidth</h2>
      <Alert variant="info" fullWidth>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" fullWidth size="small">
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
    </VStack>
  ),
};

export const Inline: Story = {
  render: () => (
    <VStack gap="4">
      <h2>Inline</h2>
      <Alert variant="info" inline>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" inline>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" size="small" inline>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" size="small" inline>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
    </VStack>
  ),
};

export const Heading: Story = {
  render: () => (
    <div className="colgap">
      <h2>Heading</h2>
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
  ),
};

export const CloseButton: Story = {
  render: () => (
    <VStack gap="4">
      <h2>CloseButton</h2>
      <Alert variant="info" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
      <Alert size="small" variant="info" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert size="small" variant="info" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" closeButton>
        <DsHeading size="small" level="3">
          Id elit esse enim reprehenderit
        </DsHeading>
        <BodyLong>
          Id elit esse enim reprehenderit enim nisi veniam nostrud.
        </BodyLong>
      </Alert>
      <Alert variant="info" closeButton size="small">
        <DsHeading size="xsmall" level="3">
          Id elit esse enim reprehenderit
        </DsHeading>
        <BodyLong>
          Id elit esse enim reprehenderit enim nisi veniam nostrud.
        </BodyLong>
      </Alert>
    </VStack>
  ),
};
export const Links: Story = {
  render: () => (
    <VStack gap="4">
      <h2>Links</h2>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <Link href="#">Id elit esse enim reprehenderit</Link>
        </Alert>
      ))}
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <VStack gap="6">
      <VStack gap="2">{Variants.render?.(...props)}</VStack>
      <VStack gap="2">{FullWidth.render?.(...props)}</VStack>
      <VStack gap="2">{Inline.render?.(...props)}</VStack>
      <VStack gap="2">{Heading.render?.(...props)}</VStack>
      <VStack gap="2">{CloseButton.render?.(...props)}</VStack>
      <VStack gap="2">{Links.render?.(...props)}</VStack>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
