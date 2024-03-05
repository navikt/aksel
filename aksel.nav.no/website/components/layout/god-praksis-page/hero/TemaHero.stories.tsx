import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import Hero from "./TemaHero";

const meta = {
  title: "Layout/god-praksis/hero/TemaHero",
  component: Hero,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Description: Story = {
  args: {
    heroNav: [
      {
        hasRefs: true,
        slug: "b",
        title: "Brukerinnsikt",
      },
      {
        hasRefs: true,
        slug: "c",
        title: "Produktutvikling",
      },
      {
        hasRefs: true,
        slug: "universell-utforming",
        title: "Universell utforming",
      },
      {
        hasRefs: true,
        slug: "c",
        title: "Design",
      },
      {
        hasRefs: true,
        slug: "c",
        title: "Innholdsarbeid",
      },
      {
        hasRefs: true,
        slug: "c3214",
        title: "Interne flater",
      },
      {
        hasRefs: true,
        slug: "c321",
        title: "nav.no",
      },
      {
        hasRefs: true,
        slug: "c",
        title: "Skjemaer",
      },
      {
        hasRefs: true,
        slug: "c123",
        title: "Fremragende team",
      },
      {
        hasRefs: true,
        slug: "c1234",
        title: "Produktutviklingsmodellen",
      },
    ],
    tema: {
      slug: "universell-utforming",
      title: "Universell utforming",
      undertema: [
        { description: "Lorem ipsum", title: "WCAG" },
        { description: "Lorem ipsum", title: "Testing" },
      ],
      description: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.`,
    },
  },
};

export const NoDescription: Story = {
  args: {
    heroNav: [
      {
        hasRefs: true,
        slug: "universell-utforming",
        title: "Universell utforming",
      },
    ],
    tema: null,
  },
};

export const LongDescription: Story = {
  args: {
    heroNav: [
      {
        hasRefs: true,
        slug: "universell-utforming",
        title: "Universell utforming",
      },
    ],
    tema: {
      slug: "universell-utforming",
      title: "Universell utforming",
      undertema: [
        { description: "Lorem ipsum", title: "WCAG" },
        { description: "Lorem ipsum", title: "Testing" },
      ],
      description: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i NAV sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.`,
    },
  },
};
