import { AkselTheme, getKey } from "@/sb-util";
import type { Meta, StoryObj } from "@storybook/react";
import RelatertInnhold from "./RelatertInnhold";

const meta = {
  title: "Sanity-modules/RelatertInnhold",
  component: RelatertInnhold,
  tags: ["autodocs"],
} satisfies Meta<typeof RelatertInnhold>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  node: {
    lenker: [
      {
        _key: getKey(),
        title: "Lenke til aksel.nav.no",
        intern: false,
        ekstern_link: "https://aksel.nav.no/",
        ekstern_domene: false,
      },
      {
        _key: getKey(),
        title: "Lenke til nav.no",
        intern: true,
        ekstern_link: "https://nav.no/",
        ekstern_domene: true,
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
