import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import InfoCard, {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "./InfoCard";

const meta: Meta<typeof InfoCard> = {
  title: "ds-react/InfoCard",
  component: InfoCard,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
  render: () => {
    return (
      <InfoCard>
        <InfoCardHeader>
          <InfoCardTitle>Info (bytt til egen overskrift)</InfoCardTitle>
        </InfoCardHeader>
        <InfoCardContent>content</InfoCardContent>
      </InfoCard>
    );
  },
};

/* export const Variants: StoryFn = () => {
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
}; */

/* export const Chromatic: Story = {
  render: () => (
    <div>
      <h2>Default</h2>
      <Default />
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
}; */
