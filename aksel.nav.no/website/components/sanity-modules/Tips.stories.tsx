import type { Meta, StoryObj } from "@storybook/react";
import { getBlocks, getKey, AkselTheme } from "@/sb-util";
import Tips from "./Tips";

const meta = {
  title: "Sanity-modules/Tips",
  component: Tips,
  tags: ["autodocs"],
} satisfies Meta<typeof Tips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {
    node: {
      body: getBlocks({}),
      _key: getKey(),
    },
  },
  decorators: [AkselTheme],
};

export const Designsystem: Story = {
  args: {
    node: {
      body: getBlocks({}),
      _key: getKey(),
    },
  },
};
