import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme, getBlocks } from "@/sb-util";
import DownloadBlock from "./DownloadBlock";

const meta = {
  title: "Sanity-modules/DownloadBlock",
  component: DownloadBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof DownloadBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {
    node: {
      title: "NAV-logo (for digitale flater)",
      body: getBlocks({ length: 1 }),
      downloadLink: "#",
      fileName: "NAV logopakke digitale flater.zip",
      size: "4321",
    },
  },
  decorators: [AkselTheme],
};
