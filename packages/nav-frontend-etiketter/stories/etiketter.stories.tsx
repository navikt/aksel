import React from "react";
import EtikettBase from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Etiketter",
  component: EtikettBase,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ children, mini, type, ...args }) => (
  <EtikettBase type={type} mini={mini} {...args}>
    {children}
  </EtikettBase>
);

export const Example = Template.bind({});
Example.args = {
  type: "info",
  children: "Innhold",
};
