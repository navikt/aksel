import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import ChipNav from "./ChipNav";

const meta = {
  title: "Layout/god-praksis/ChipNav",
  component: ChipNav,
  tags: ["autodocs"],
} satisfies Meta<typeof ChipNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {},
  decorators: [AkselTheme],
};
