import React from "react";
import * as Cards from "../generated-cards";

export default {
  title: "ds-react-navno/Cards",
  argTypes: {
    card: {
      options: Object.entries(Cards).map(([Name, _]) => Name),
      control: {
        type: "select",
      },
    },
    customText: {
      control: { type: "text" },
    },
  },
  args: {
    card: "BarnepensjonCard",
  },
};

const Template = ({ card, customText, ...args }) => {
  const CardName = Cards[card];

  return (
    <>
      <CardName {...args} size="large" customText={customText} />
      <CardName {...args} size="mini" customText={customText} />
      <CardName {...args} size="micro" customText={customText} />
    </>
  );
};

export const All = Template.bind({});
