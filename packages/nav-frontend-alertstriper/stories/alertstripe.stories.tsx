import React from "react";
import Alertstripe, {
  AlertStripeAdvarsel,
  AlertStripeFeil,
  AlertStripeSuksess,
  AlertStripeInfo,
} from "../src/alertstripe";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Alertstripe",
  component: Alertstripe,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ children, type, ...args }) => (
  <Alertstripe type={type} {...args}>
    {children}
  </Alertstripe>
);

export const Example = Template.bind({});
Example.args = {
  type: "info",
  children: "Excepteur esse id incididunt magna nostrud.",
};
