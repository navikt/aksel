import type { Meta, StoryObj } from "@storybook/react";
import TokenTable from "./TokenTable";

const meta = {
  title: "Sanity-modules/TokenTable",
  component: TokenTable,
  tags: ["autodocs"],
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithShowMore: Story = {
  args: {
    node: {
      kategori: "Core",
      title: "button",
    },
  },
};

export const WithOutShowMore: Story = {
  args: {
    node: {
      kategori: "Core",
      title: "forms",
    },
  },
};
