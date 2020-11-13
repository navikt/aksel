import React, { useRef, useState, useCallback } from "react";
import Popover from "../src/index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "@nav-frontend/popover",
  component: Popover,
} as Meta;

const Template = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const testRef = useRef(null);

  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button onClick={() => testRef.current.focus()}>Test</button>
      <div ref={anchorRef}>
        anchor div
        <a href="example.com">a href</a>
        <button onClick={() => setOpen(true)}>Dette er en stor knapp</button>
        anchor div
      </div>
      <Popover
        ref={testRef}
        open={open}
        anchorEl={anchorRef.current}
        onClose={onClose}
      >
        Dette er popover innhold
        <button>Test</button>
      </Popover>
      <button>Test</button>
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
