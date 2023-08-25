import type { Meta, StoryObj } from "@storybook/react";
import { getKey, AkselTheme } from "@/sb-util";
import Video from "./Video";

const meta = {
  title: "Sanity-modules/Video",
  component: Video,
  tags: ["autodocs"],
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  node: {
    _key: getKey(),
    alt: "Alt-tekst for video",
    caption: "caption-tekst",
    transkripsjon: "Transkripsjonstekst",
    webm: {
      url: "https://cdn.sanity.io/files/hnbe3yhs/production/274a2ceb69b056e1a7048ad1a5a2f8deff53a2f4.webm",
      extension: "WEBM",
    },
  },
};

export const Aksel: Story = {
  args,
  decorators: [AkselTheme],
};

export const Designsystem: Story = {
  args,
};
