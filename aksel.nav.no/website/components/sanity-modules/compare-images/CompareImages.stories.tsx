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

const image1 =
  "https://aksel.nav.no/_next/image?url=%2Fimages%2Fthumbnail%2Fblogg%2Fimage-5.svg&w=3840&q=75";
const image2 =
  "https://aksel.nav.no/_next/image?url=%2Fimages%2Fthumbnail%2Fblogg%2Fimage-7.svg&w=3840&q=75";

export const Aksel: Story = {
  args: {
    image1,
    image2,
  },
  decorators: [AkselTheme],
};
