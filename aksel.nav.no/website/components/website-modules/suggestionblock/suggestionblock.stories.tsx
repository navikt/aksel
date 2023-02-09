import { SuggestionBlock } from "./index";
import { Meta } from "@storybook/react";
import { NextDecorator } from "../../StoryDecorator";

const MetaData: Meta = {
  component: SuggestionBlock,
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
