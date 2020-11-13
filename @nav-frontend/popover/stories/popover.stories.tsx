import React, { useRef, useState } from "react";
import Popover from "../src/Index";
import { Meta } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core";
export default {
  title: "@nav-frontend/popover",
  component: Popover,
} as Meta;

const Template = ({ type, placement, ...props }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{ background: "grey", textAlign: "center" }}
        onClick={() => setOpen(!open)}
        ref={anchorRef}
      >
        {type}
      </div>
      <Popover
        anchorEl={anchorRef.current}
        onClose={() => {}}
        placement={placement}
        open={open}
      >
        Popover contents
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div style={{ padding: "4rem" }}>
      {placements.map((type) => (
        <div
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
        >
          <Template type={type} placement={type} />
        </div>
      ))}
    </div>
  );
};
