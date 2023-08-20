import type { Meta, StoryObj } from "@storybook/react";
import { getBlocks, getKey, AkselTheme } from "@/sb-util";
import Tips from "./Tips";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Sanity-modules/Tips",
  component: Tips,
  tags: ["autodocs"],
} satisfies Meta<typeof Tips>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
  decorators: [AkselTheme],
};
