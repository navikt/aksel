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
        slug: "b",
        title: "Brukerinnsikt",
        image: null,
      },
      {
        slug: "c",
        title: "Produktutvikling",
        image: null,
      },
      {
        slug: "universell-utforming",
        title: "Universell utforming",
        image: null,
      },
      {
        slug: "c",
        title: "Design",
        image: null,
      },
      {
        slug: "c",
        title: "Innholdsarbeid",
        image: null,
      },
      {
        slug: "c3214",
        title: "Interne flater",
        image: null,
      },
      {
        slug: "c321",
        title: "nav.no",
        image: null,
      },
      {
        slug: "c",
        title: "Skjemaer",
        image: null,
      },
      {
        slug: "c123",
        title: "Fremragende team",
        image: null,
      },
      {
        slug: "c1234",
        title: "Produktutviklingsmodellen",
        image: null,
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
      image: null,
    },
  },
};

export const NoDescription: Story = {
  args: {
    heroNav: [
      {
        slug: "universell-utforming",
        title: "Universell utforming",
        image: null,
      },
    ],
    tema: null,
  },
};

export const LongDescription: Story = {
  args: {
    heroNav: [
      {
        slug: "universell-utforming",
        title: "Universell utforming",
        image: null,
      },
    ],
    tema: {
      slug: "universell-utforming",
      title: "Universell utforming",
      undertema: [
        { description: "Lorem ipsum", title: "WCAG" },
        { description: "Lorem ipsum", title: "Testing" },
      ],
      image: null,
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
