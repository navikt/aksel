import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme, getBlocks } from "@/sb-util";
import DownloadsBlock from "./Downloads";

const meta = {
  title: "Sanity-modules/DownloadsBlock",
  component: DownloadsBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof DownloadsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {
    node: {
      title: "NAV-logo (for digitale flater)",
      content: getBlocks({}),
      downloadLink: "#",
      fileName: "NAV logopakke digitale flater.zip",
    },
  },
  decorators: [AkselTheme],
};
