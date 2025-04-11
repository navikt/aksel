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
      },
      {
        slug: "c",
        title: "Produktutvikling",
      },
      {
        slug: "universell-utforming",
        title: "Universell utforming",
      },
      {
        slug: "c",
        title: "Design",
      },
      {
        slug: "c",
        title: "Innholdsarbeid",
      },
      {
        slug: "c3214",
        title: "Interne flater",
      },
      {
        slug: "c321",
        title: "nav.no",
      },
      {
        slug: "c",
        title: "Skjemaer",
      },
      {
        slug: "c123",
        title: "Fremragende team",
      },
      {
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
      description: `Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.`,
    },
  },
};

export const NoDescription: Story = {
  args: {
    heroNav: [
      {
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

      description: `Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.
      Alle som jobber med produktutvikling i Nav sitter på kunnskap og
      erfaring som er nyttig for andre. Derfor deler vi god praksis med
      hverandre her.`,
    },
  },
};
