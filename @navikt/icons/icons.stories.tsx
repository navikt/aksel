import React from "react";

import * as Icons from "./src";
export default {
  title: "ds-icons/Ikoner",
  argTypes: {
    Icon: {
      defaultValue: "System",
      control: {
        type: "select",
        options: Object.entries(Icons).map(([Name, _]) => Name),
      },
    },
    color: { control: "color" },
  },
};

export const Default = {
  render: ({ Icon, color, size, ...args }) => {
    const Iconname = Icons[Icon];
    return <Iconname style={{ fontSize: size, color }} {...args} />;
  },

  args: {
    size: "24px",
  },
};
