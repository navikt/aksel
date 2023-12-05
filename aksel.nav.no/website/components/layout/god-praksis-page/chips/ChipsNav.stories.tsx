import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import ChipNav from "./ChipNav";

const meta = {
  title: "Layout/god-praksis/ChipNav",
  component: ChipNav,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof ChipNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Innholdstype: Story = {
  args: {
    type: "innholdstype",
    options: ["Metode", "Teori", "Verktøy", "Strategi", "Prinsipp"],
  },
};

export const Undertema: Story = {
  args: {
    type: "undertema",
    options: ["Retningslinjer", "WCAG", "Testing", "Kompetanse"],
  },
};

export const LongList: Story = {
  args: {
    type: "undertema",
    options: [
      "Retningslinjer",
      "WCAG",
      "Testing",
      "Kompetanse",
      "Retningslinjer",
      "WCAG",
      "Testing",
      "Kompetanse",
      "Retningslinjer",
      "WCAG",
      "Testing",
      "Kompetanse",
    ],
  },
};
