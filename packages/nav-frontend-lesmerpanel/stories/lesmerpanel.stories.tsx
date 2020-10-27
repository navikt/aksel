import React from "react";
import Lesmerpanel from "../src/lesmerpanel";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Lesmerpanel",
  component: Lesmerpanel,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ intro, border, children, ...args }) => (
  <Lesmerpanel intro={intro} border={border} {...args}>
    {children}
  </Lesmerpanel>
);

export const Example = Template.bind({});
Example.args = {
  intro: "Tekst som vises før panelet åpnes",
  children: "Tekst som vises etter panelet åpnes",
  border: true,
};
