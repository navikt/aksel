import React from "react";
import { Hamburgerknapp } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Ikonknapper",
  component: Hamburgerknapp,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ spinner, mini, kompakt, ...args }) => (
  <Hamburgerknapp spinner={spinner} mini={mini} kompakt={kompakt} {...args} />
);

export const Example = Template.bind({});
Example.args = {
  spinner: false,
  mini: false,
  kompakt: false,
};
