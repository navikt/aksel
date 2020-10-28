import React from "react";
import Ekspanderbartpanel from "../src/index";

import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Ekspanderbartpanel",
  component: Ekspanderbartpanel,
  parameters: {
    chromatic: { disabled: true },
  },
} as Meta;

const Template = ({ children, tittel, apen, border, ...args }) => (
  <Ekspanderbartpanel border={border} apen={apen} tittel={tittel} {...args}>
    {children}
  </Ekspanderbartpanel>
);

export const Example = Template.bind({});
Example.args = {
  tittel: "Tittel",
  apen: false,
  border: true,
  children:
    "Adipisicing esse ut non id id. Aliqua reprehenderit in nostrud excepteur eiusmod dolor ullamco duis. Sint in tempor voluptate amet nulla qui cupidatat qui do anim est. Amet dolore Lorem aliqua nisi velit mollit. Fugiat qui nisi reprehenderit nostrud non. Fugiat duis occaecat proident exercitation est. Cupidatat dolor veniam duis aliqua ea adipisicing eu ea anim consequat magna aute.",
};
