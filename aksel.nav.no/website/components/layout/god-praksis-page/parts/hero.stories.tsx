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
    children: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.`,
  },
};

export const NoDescription: Story = {
  args: {},
};

export const LongDescription: Story = {
  args: {
    children: `Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.
    Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.
    Alle som jobber med produktutvikling i NAV sitter på kunnskap og
    erfaring som er nyttig for andre. Derfor deler vi god praksis med
    hverandre her.`,
  },
};
