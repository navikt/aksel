import React from "react";
import Panel from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Panel",
  component: Panel,
  parameters: {
    chromatic: { disabled: true },
  },
} as Meta;

const Template = ({ ...args }) => {
  return (
    <Panel {...args}>
      Deserunt ad ullamco qui cupidatat eu fugiat incididunt ex ea culpa sit
      consequat. Amet incididunt commodo incididunt voluptate do esse do fugiat
      duis. Sit voluptate reprehenderit voluptate amet excepteur incididunt
      exercitation sit pariatur amet exercitation duis ullamco. Tempor ipsum
      mollit cupidatat anim reprehenderit cupidatat velit. Do qui adipisicing
      consequat cillum qui et labore exercitation qui non. Elit voluptate et
      irure cupidatat ex velit mollit est cillum. Excepteur dolor sint deserunt
      in nulla fugiat cillum irure consectetur.
    </Panel>
  );
};

export const Example = Template.bind({});
Example.args = {
  border: true,
};
