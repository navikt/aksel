import React from "react";
import Lenkepanel from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Lenkepanel",
  component: Lenkepanel,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ children = " ", border, tittelProps, ...args }) => (
  <Lenkepanel href="#" border={border} tittelProps={tittelProps} {...args}>
    {children}
  </Lenkepanel>
);

export const Example = Template.bind({});
Example.args = {
  children:
    "Eu laborum do laborum eu proident commodo aliquip sit sint ullamco nostrud do eiusmod duis. Deserunt non qui sit ad dolore. Sunt nostrud do laborum dolor veniam anim laboris sunt veniam sit amet cupidatat laborum ut. In tempor sit ut sint enim mollit Lorem aute do exercitation est commodo proident. Aliquip dolor consequat ipsum aliquip qui in esse exercitation.",
  border: true,
  tittelProps: "undertittel",
  linkCreator: undefined,
};
