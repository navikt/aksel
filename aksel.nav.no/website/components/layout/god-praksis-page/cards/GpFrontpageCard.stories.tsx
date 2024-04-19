import type { Meta, StoryObj } from "@storybook/react";
import { HGrid } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import GpFrontpageCard from "./GpFrontpageCard";

const meta = {
  title: "Layout/god-praksis/cards/FrontpageCard",
  component: GpFrontpageCard,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpFrontpageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const title = {
  short: "Design",
  medium: "Brukerinnsikt",
  long: "Produktutviklingsmodellen",
};

export const CompactSingle: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: title.long,
  },
};

export const CompactMultiple = {
  render: (props) => {
    return (
      <HGrid gap="4" columns={{ xs: 1, md: 2 }}>
        <GpFrontpageCard {...props} href="test">
          {title.short}
        </GpFrontpageCard>
        <GpFrontpageCard {...props} href="test">
          {title.short}
        </GpFrontpageCard>
        <GpFrontpageCard {...props} href="test">
          {title.medium}
        </GpFrontpageCard>
        <GpFrontpageCard {...props} href="test">
          {title.long}
        </GpFrontpageCard>
      </HGrid>
    );
  },
  args: {
    innholdstype: "Testing",
    undertema: "WCAG",
  },
};
