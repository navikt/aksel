import type { Meta, StoryObj } from "@storybook/react";
import { HeroPanel } from "@/web/hero-panel/HeroPanel";

const meta = {
  title: "Website-modules/HeroPanel",
  component: HeroPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof HeroPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GodPraksis: Story = {
  args: {
    variant: "god-praksis",
    children: "God praksis",
  },
};
