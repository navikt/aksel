import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import ChipNav from "./ChipNav";

const meta = {
  title: "Layout/god-praksis/ChipNav",
  component: ChipNav,
  tags: ["autodocs"],
  decorators: [AkselTheme],
  parameters: {
    backgrounds: {
      default: "god-praksis",
      values: [
        {
          name: "god-praksis",
          value: "var(--a-surface-subtle)",
        },
      ],
    },
  },
} satisfies Meta<typeof ChipNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Innholdstype: Story = {
  args: {
    type: "innholdstype",
    data: [
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
    ],
  },
};

export const Undertema: Story = {
  args: {
    type: "undertema",
    data: [
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
    ],
  },
};

export const LongList: Story = {
  args: {
    type: "innholdstype",
    data: [
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
      { title: "Title 1", count: 10 },
      { title: "Title 2", count: 20 },
    ],
  },
};
