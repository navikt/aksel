import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import Popover from "../src/popover";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Popover/All",
  component: Popover,
} as Meta;

const Template = ({ ...props }) => {
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
      <Popover ankerEl={anchor} {...props}>
        <p>Dette er en popover.</p>
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "80%",
      }}
    >
      <Template />
      <Template utenPil />
    </div>
  );
};
