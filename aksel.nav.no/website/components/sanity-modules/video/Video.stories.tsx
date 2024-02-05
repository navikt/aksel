import type { Meta, StoryObj } from "@storybook/react";
import { SANITY_PROJECT_ID } from "@/sanity/config";
import { AkselTheme, getKey } from "@/sb-util";
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
    transkripsjon:
      "Transkripsjonstekst avsnitt 1 linje 1\nLinje 2\n\nTranskripsjonstekst avsnitt 2",
    webm: {
      url: `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/274a2ceb69b056e1a7048ad1a5a2f8deff53a2f4.webm`,
      extension: "WEBM",
    },
    track:
      "data:@file/octet-stream;base64,V0VCVlRUCgowMDowMS4wMDAgLS0+IDAwOjAyLjAwMApIZWkhCgowMDowMy4wMDAgLS0+IDAwOjA0LjUwMApEZXR0ZSBlciBldCBla3NlbXBlbAoKMDA6MDQuNTAwIC0tPiAwMDowNS43MDAKcMOlIHVuZGVydGVrc3Rlci4=",
  },
};

export const Aksel: Story = {
  args,
  decorators: [AkselTheme],
};

export const Designsystem: Story = {
  args,
};
