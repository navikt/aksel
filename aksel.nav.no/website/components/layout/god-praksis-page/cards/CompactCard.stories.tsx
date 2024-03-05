import type { Meta, StoryObj } from "@storybook/react";
import { HGrid } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import GpCompactCard from "./CompactCard";

const meta = {
  title: "Layout/god-praksis/cards/CompactCard",
  component: GpCompactCard,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpCompactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: "Brukeropplevelse",
  },
};

export const Multiple = {
  render: () => {
    return (
      <HGrid gap="4" columns={{ xs: 1, md: 2 }}>
        <GpCompactCard href="test">Brukerinnsikt</GpCompactCard>
        <GpCompactCard href="test">Universell Utforming</GpCompactCard>
        <GpCompactCard href="test">Innsiktsarbeid</GpCompactCard>
        <GpCompactCard href="test">nav.no</GpCompactCard>
      </HGrid>
    );
  },
};
