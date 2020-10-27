import React, { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import Lenke from "../src/lenke";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Lenke",
  component: Lenke,
  parameters: {
    chroamtic: { disabled: true },
  },
} as Meta;

const Template = ({ children, ...args }) => {
  return (
    <Lenke href="#" {...args}>
      {children}
    </Lenke>
  );
};

export const Example = Template.bind({});
Example.args = {
  children: "Lenketekst",
};
