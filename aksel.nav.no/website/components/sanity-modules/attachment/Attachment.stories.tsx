import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme, getBlocks } from "@/sb-util";
import Attachment from "./Attachment";

const meta = {
  title: "Sanity-modules/Attachment",
  component: Attachment,
  tags: ["autodocs"],
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {
    node: {
      title: "Nav-logo (for digitale flater)",
      body: getBlocks({ length: 1 }),
      downloadLink: "1234.zip",
      fileName: "Nav logopakke digitale flater",
      size: "4321",
    },
  },
  decorators: [AkselTheme],
};

export const NoBody: Story = {
  args: {
    node: {
      title: "Nav-logo (for digitale flater)",
      downloadLink: "1234.zip",
      fileName: "Nav logopakke digitale flater",
      size: "4321",
    },
  },
  decorators: [AkselTheme],
};
