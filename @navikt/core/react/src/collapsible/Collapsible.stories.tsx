import { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "ds-react/Chips",
  component: Collapsible,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {};
