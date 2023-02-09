import { SuggestionBlock } from "./index";
import { Meta } from "@storybook/react";
import { NextDecorator } from "../../StoryDecorator";

const MetaData: Meta = {
  component: SuggestionBlock,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextDecorator>
        <Story />
      </NextDecorator>
    ),
  ],
};

export default MetaData;

export const Ikoner = {
  render: () => <SuggestionBlock variant="ikoner" />,
};

export const Ikon = {
  render: () => <SuggestionBlock variant="ikon" />,
};

export const Komponent = {
  render: () => <SuggestionBlock variant="komponent" />,
};

export const KomponentBeta = {
  render: () => <SuggestionBlock variant="komponent-beta" />,
};

export const KomponentNy = {
  render: () => <SuggestionBlock variant="komponent-ny" />,
};

export const Komponenter = {
  render: () => <SuggestionBlock variant="komponenter" />,
};
