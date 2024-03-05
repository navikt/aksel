import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import { Multiple } from "../cards/HeroCard.stories";
import Hero from "./StaticHero";

const meta = {
  title: "Layout/god-praksis/hero/StaticHero",
  component: Hero,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Description: Story = {
  args: {
    title: "God praksis",
    description: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.`,
    children: <Multiple.render />,
  },
};

export const NoChildren: Story = {
  args: {
    title: "God praksis",
    description: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.`,
    children: null,
  },
};

export const NoDescription: Story = {
  args: {
    title: "God praksis",
    description: "",
    children: <Multiple.render />,
  },
};

export const LongDescription: Story = {
  args: {
    title: "God praksis",
    description: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her. Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her. Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her. Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.`,
    children: <Multiple.render />,
  },
};
