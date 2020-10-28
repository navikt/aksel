import React from "react";
import NavFrontendChevron from "../src/chevron";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Chevron",
  component: NavFrontendChevron,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ stor, type, ...args }) => (
  <NavFrontendChevron type={type} stor={stor} {...args} />
);

export const Example = Template.bind({});
Example.args = {
  type: "høyre",
  stor: false,
};
