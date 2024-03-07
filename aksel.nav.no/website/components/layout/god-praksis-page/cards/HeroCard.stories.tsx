import type { Meta, StoryObj } from "@storybook/react";
import { HStack } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import GpHeroCard from "./HeroCard";

const meta = {
  title: "Layout/god-praksis/cards/HeroCard",
  component: GpHeroCard,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    articleCount: 4,
    href: "gp/brukeropplevelse",
    children: "Brukeropplevelse",
  },
};

export const Multiple = {
  render: () => {
    return (
      <HStack gap="4">
        <GpHeroCard href="test" articleCount={4} image={null}>
          Brukerinnsikt
        </GpHeroCard>
        <GpHeroCard href="test" articleCount={20} image={null}>
          Universell Utforming
        </GpHeroCard>
        <GpHeroCard href="test" articleCount={2} image={null}>
          Innsiktsarbeid
        </GpHeroCard>
        <GpHeroCard href="test" articleCount={40} image={null}>
          nav.no
        </GpHeroCard>
      </HStack>
    );
  },
};