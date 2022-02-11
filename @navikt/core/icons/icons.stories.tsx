import React from "react";
import { storiesOf } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";

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

if (isChromatic()) {
  const iconsStories = storiesOf("ds-icons/Ikoner", module);

  Object.entries(Icons).forEach(([name, Icon]) => {
    iconsStories.add(name, () => (
      <div>
        <Icon title="hello, world" />
        <Icon style={{ height: "2em", width: "2em" }} />
        <Icon style={{ height: "4em", width: "4em" }} />
        <Icon style={{ height: "4em", width: "4em", color: "white" }} />
        <Icon style={{ height: "4em", width: "4em", color: "crimson" }} />
        <br />
        <Icon
          style={{ height: "4em", width: "4em", backgroundColor: "#aaa" }}
        />
        <Icon
          style={{ height: "4em", width: "4em", backgroundColor: "#777" }}
        />
        <Icon
          style={{ height: "4em", width: "4em", backgroundColor: "#333" }}
        />
        <Icon
          style={{ height: "4em", width: "4em", backgroundColor: "#000" }}
        />
        <br />
        <Icon
          style={{ height: "4em", width: "4em", transform: "rotate(45deg)" }}
        />
        <Icon
          style={{ height: "4em", width: "4em", transform: "rotate(90deg)" }}
        />
        <Icon
          style={{ height: "4em", width: "4em", transform: "rotate(180deg)" }}
        />
      </div>
    ));
  });
}

const Template = ({ Icon, color, size, ...args }) => {
  const Iconname = Icons[Icon];
  return <Iconname style={{ fontSize: size, color }} {...args} />;
};
export const Ikon = Template.bind({});
Ikon.args = {
  size: "24px",
};
