import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import Popover from "../src/popover";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Popover",
  component: Popover,
  parameters: {
    chromatic: { disabled: true },
  },
} as Meta;

const Template = ({ ...args }) => {
  const [anchor, setAnchor] = useState(undefined);
  const popoverRef = useRef<any>();
  useEffect(() => {
    ReactDOM.findDOMNode(popoverRef.current).click();
  });
  return (
    <>
      <button
        ref={popoverRef}
        onClick={(e) => setAnchor(e.currentTarget)}
        style={{
          marginTop: "7rem",
          marginLeft: "7rem",
        }}
      >
        open
      </button>
      <Popover ankerEl={anchor} onRequestClose={() => null} {...args}>
        <p>Dette er en popover.</p>
      </Popover>
    </>
  );
};

export const Example = Template.bind({});
