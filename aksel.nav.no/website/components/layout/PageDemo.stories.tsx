import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "PageDemo/navno",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  render: () => {
    return <div>hello world</div>;
  },
};
