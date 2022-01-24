import React from "react";
import * as Cards from "../";

export default {
  title: "ds-react-navno/Cards",
  argTypes: {
    Card: {
      defaultValue: "BarnepensjonCard",
      control: {
        type: "select",
        options: Object.entries(Cards).map(([Name, _]) => Name),
      },
    },
  },
};

const Template = ({ Card, ...args }) => {
  const Cardname = Cards[Card];
  return <Cardname {...args} />;
};
export const All = Template.bind({});
