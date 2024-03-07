import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import Hero from "./IntroHero";

const meta = {
  title: "Layout/god-praksis/hero/StaticHero",
  component: Hero,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoChildren: Story = {
  args: {
    title: "God praksis",
    children: null,
  },
};
