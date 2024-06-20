import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../layout/stack";
import { Link } from "../link";
import { BodyLong, Heading } from "../typography";
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
  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    fullWidth: false,
    contentMaxWidth: true,
    inline: false,
    variant: "info",
    size: "medium",
    closeButton: false,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: variants,
    },
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
  },
};

export const Variants: StoryFn = () => {
  return (
    <VStack gap="4">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant}>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud. ",
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud. ",
          )}
        </Alert>
      ))}
    </VStack>
  );
};

export const FullWidth: StoryFn = () => {
  return (
    <VStack gap="4">
      <Alert variant="info" fullWidth>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" fullWidth size="small">
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
    </VStack>
  );
};

export const ContentMaxWidthOff: StoryFn = () => (
  <Alert variant="info" contentMaxWidth={false}>
    Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
    reprehenderit enim nisi.
  </Alert>
);

export const Inline: StoryFn = () => {
  return (
    <VStack gap="4">
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
  );
};

export const WithHeading: StoryFn = () => {
  return (
    <VStack gap="4">
      <Alert variant="info">
        <Heading spacing size="small" level="3">
          Aliquip duis est in commodo pariatur
        </Heading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
      <Alert variant="info" size="small">
        <Heading spacing size="xsmall" level="3">
          Aliquip duis est in commodo pariatur
        </Heading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
    </VStack>
  );
};

export const CloseButton: StoryFn = () => {
  return (
    <VStack gap="4">
      <Alert variant="info" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert variant="success" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
      <Alert size="small" variant="error" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud.
      </Alert>
      <Alert size="small" variant="warning" closeButton>
        Id elit esse enim reprehenderit enim nisi veniam nostrud. Id elit esse
        enim reprehenderit enim nisi veniam nostrud. Id elit esse enim
        reprehenderit enim nisi veniam nostrud. Id elit esse enim reprehenderit
        enim nisi veniam nostrud.
      </Alert>
      <Alert variant="info" closeButton>
        <Heading size="small" level="3">
          Id elit esse enim reprehenderit
        </Heading>
        <BodyLong>
          Id elit esse enim reprehenderit enim nisi veniam nostrud.
        </BodyLong>
      </Alert>
      <Alert variant="info" closeButton size="small">
        <Heading size="xsmall" level="3">
          Id elit esse enim reprehenderit
        </Heading>
        <BodyLong>
          Id elit esse enim reprehenderit enim nisi veniam nostrud.
        </BodyLong>
      </Alert>
    </VStack>
  );
};

export const Chromatic: Story = {
  render: () => (
    <div>
      <h2>Variants</h2>
      <Variants />

      <h2>FullWidth</h2>
      <FullWidth />

      <h2>ContentMaxWidthOff</h2>
      <ContentMaxWidthOff />

      <h2>Inline</h2>
      <Inline />

      <h2>Heading</h2>
      <WithHeading />

      <h2>CloseButton</h2>
      <CloseButton />

      <h2>Links</h2>
      <VStack gap="2">
        {variants.map((variant) => (
          <Alert key={variant} variant={variant}>
            <Link href="#">Id elit esse enim reprehenderit</Link>
          </Alert>
        ))}
      </VStack>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
