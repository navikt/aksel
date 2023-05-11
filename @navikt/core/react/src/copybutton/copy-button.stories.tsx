import React from "react";
import { CopyButton } from ".";

export default {
  title: "ds-react/CopyButton",
  component: CopyButton,
  argTypes: {
    size: {
      defaultValue: "medium",
      control: {
        type: "radio",
        options: ["xsmall", "small", "medium"],
      },
    },
  },
};

export const Default = {
  render: (args) => <CopyButton {...args} />,
  args: {
    size: "medium",
  },
};
