import React, { useRef, useState } from "react";
import Popover from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "@nav-frontend/popover",
  component: Popover,
} as Meta;

const Template = ({ ...props }) => {
  const [anchor, setAnchor] = useState(null);
  const popoverRef = useRef<any>();

  return (
    <>
      <button
        ref={popoverRef}
        onClick={(e) => setAnchor(e.currentTarget)}
        style={{ width: "50px" }}
      >
        open
      </button>
      <Popover anchor={anchor} onRequestClose={() => setAnchor(null)}>
        <p>Dette er en popover.</p>
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div
      style={{
        width: "450px",
        height: "250px",
        overflowY: "scroll",
        resize: "both",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "600px",
          margin: "auto",
          marginTop: "70%",
          overscrollBehavior: "contain",
        }}
      >
        <Template />
      </div>
    </div>
  );
};
