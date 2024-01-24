import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme, getKey } from "@/sb-util";
import Tabell from "./Tabell";

const meta = {
  title: "Sanity-modules/Tabell",
  component: Tabell,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabell>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  node: {
    rows: [
      {
        _key: getKey(),
        cells: ["Tablehead 1", "Tablehead 2", "Tablehead 3"],
      },
      {
        _key: getKey(),
        cells: ["Cell 1", "Cell 2", "Cell 3"],
      },
      {
        _key: getKey(),
        cells: ["Cell 1", "Cell 2", "Cell 3"],
      },
    ],
  },
};
export const Aksel: Story = {
  args,
  decorators: [AkselTheme],
};

export const Designsystem: Story = {
  args,
};
