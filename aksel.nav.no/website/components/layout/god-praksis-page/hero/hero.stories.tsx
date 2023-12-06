import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import Hero from "./Hero";

const meta = {
  title: "Layout/god-praksis/Hero",
  component: Hero,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Description: Story = {
  args: {
    heroNav: [
      { refs: [], slug: "universell-utforming", title: "Universell utforming" },
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
      { refs: [], slug: "universell-utforming", title: "Universell utforming" },
    ],
    tema: null,
  },
};

export const LongDescription: Story = {
  args: {
    heroNav: [
      { refs: [], slug: "universell-utforming", title: "Universell utforming" },
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
