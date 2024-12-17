import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import CompareImages from "./CompareImages";

const meta = {
  title: "Sanity-modules/CompareImages",
  component: CompareImages,
  tags: ["autodocs"],
} satisfies Meta<typeof CompareImages>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {},
  decorators: [AkselTheme],
};
