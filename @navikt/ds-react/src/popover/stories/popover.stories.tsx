import React, { useState } from "react";
import { Popover, PopoverBase } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core";
export default {
  title: "ds-react/popover",
  component: Popover,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <div
        style={{
          background: "#eee",
          border: "1px solid blue",
          textAlign: "center",
          width: "150px",
        }}
        ref={(el) => setAnchorEl(el)}
      >
        {props.placement}
      </div>
      <Popover {...props} anchorEl={anchorEl} onClose={() => {}} open>
        <div style={{ margin: "1rem" }}>Contents</div>
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "4rem 8rem 4rem 8rem",
      }}
    >
      {placements.map((placement) => (
        <div
          style={{
            width: "20%",
            height: "100px",
            margin: "4rem",
          }}
        >
          <Template placement={placement} />
        </div>
      ))}
    </div>
  );
};

export const PopoverBaseExample = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open</button>
      <div style={{ width: 50, height: 50, background: "blue" }}></div>
      <PopoverBase onClose={() => {}} open={open} position={{ y: 50, x: 50 }}>
        <div style={{ margin: "1rem" }}>Contents</div>
      </PopoverBase>
      <div style={{ width: 300, height: 200, background: "lightblue" }}></div>
    </div>
  );
};
