import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import Hero from "./Hero";

const meta = {
  title: "Layout/god-praksis/Hero",
  component: Hero,
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {},
  decorators: [AkselTheme],
};
