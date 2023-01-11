import React from "react";
import { PageHeader } from ".";

export default {
  title: "ds-navno/PageHeader",
  component: PageHeader,
  argTypes: {
    variant: {
      defaultValue: "var1",
      control: {
        type: "radio",
        options: ["var1", "var1"],
      },
    },
  },
};

export const Default = (props) => <PageHeader>{props.children}</PageHeader>;

Default.args = {
  children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
};
