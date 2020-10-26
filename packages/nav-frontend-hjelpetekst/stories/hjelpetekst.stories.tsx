import React from "react";
import Hjelpetekst from "../src/hjelpetekst";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Hjelpetekst",
  component: Hjelpetekst,
} as Meta;

const Template = ({ children, mini, type, ...args }) => (
  <Hjelpetekst style={{ margin: "6rem 0 0 6rem" }} type={type} {...args}>
    {children}
  </Hjelpetekst>
);

export const Example = Template.bind({});
Example.args = {
  type: "under",
  children: "Innhold",
};
