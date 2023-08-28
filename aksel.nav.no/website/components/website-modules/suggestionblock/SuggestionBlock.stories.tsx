import type { Meta, StoryObj } from "@storybook/react";
import { SuggestionBlock } from "./index";

const meta = {
  title: "Website-modules/SuggestionBlock",
  component: SuggestionBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof SuggestionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Komponent: Story = {
  args: {
    variant: "komponent",
  },
};

export const KomponentBeta: Story = {
  args: {
    variant: "komponent-beta",
  },
};

export const KomponentNy: Story = {
  args: {
    variant: "komponent-ny",
  },
};

export const Ikon: Story = {
  args: {
    variant: "ikon",
  },
};

export const IkonNotFound: Story = {
  args: {
    variant: "ikon-not-found",
  },
};

export const Ikoner: Story = {
  args: {
    variant: "ikoner",
  },
};
