import type { Meta, StoryObj } from "@storybook/react";
import { HGrid } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import GpArticleCard from "./GpArticleCard";

const meta = {
  title: "Layout/god-praksis/cards/ArticleCard",
  component: GpArticleCard,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const title = {
  short: "AI",
  medium: "Machine Learning Basics",
  long: "A Comprehensive Guide to Understanding and Implementing Transformer Models in NLP",
};

export const CompactSingle: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: title.long,
    innholdstype: "Testing",
    undertema: "WCAG",
    description: "",
    date: "",
  },
};

export const CompactMultiple = {
  render: (props) => {
    return (
      <HGrid gap="4" columns={{ xs: 1, md: 2 }}>
        <GpArticleCard {...props} href="test">
          {title.short}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.short}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.medium}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.long}
        </GpArticleCard>
      </HGrid>
    );
  },
  args: {
    innholdstype: "Testing",
    undertema: "WCAG",
  },
};

export const ExpressiveSingle: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: "Brukeropplevelse",
    innholdstype: "Testing",
    undertema: "WCAG",
    description:
      "La brukeren sortere innholdet på en måte som er logisk for dem med kortsortering og UXtweak.",
    date: "2021-01-01",
  },
};

export const ExpressiveMultiple = {
  render: (props) => {
    return (
      <HGrid gap="4" columns={{ xs: 1, md: 2 }}>
        <GpArticleCard {...props} href="test">
          {title.short}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.short}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.medium}
        </GpArticleCard>
        <GpArticleCard {...props} href="test">
          {title.long}
        </GpArticleCard>
      </HGrid>
    );
  },
  args: {
    children: title.medium,
    undertema: "WCAG",
    description:
      "La brukeren sortere innholdet på en måte som er logisk for dem med kortsortering og UXtweak.",
    date: "2021-01-01",
  },
};

export const ExpressiveNoDescription: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: title.long,
    innholdstype: "Testing",
    undertema: "WCAG",
    date: "2021-01-01",
  },
};

export const ExpressiveLongDescription: Story = {
  args: {
    href: "gp/brukeropplevelse",
    children: title.long,
    innholdstype: "Testing",
    undertema: "WCAG",
    date: "2021-01-01",
    description:
      "This is a description that is very long and should be truncated to a reasonable length to fit the card layout. This is a description that is very long and should be truncated to a reasonable length to fit the card layout. This is a description that is very long and should be truncated to a reasonable length to fit the card layout. This is a description that is very long and should be truncated to a reasonable length to fit the card layout. This is a description that is very long and should be truncated to a reasonable length to fit the card layout. This is a description that is very long and should be truncated to a reasonable length to fit the card layout.",
  },
};
