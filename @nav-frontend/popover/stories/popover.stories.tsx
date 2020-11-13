import React, { useEffect, useRef, useState } from "react";
import Popover from "../src/Index";
import { Meta } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core";
export default {
  title: "@nav-frontend/popover",
  component: Popover,
} as Meta;

const Template = ({ type, placement, ...props }) => {
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
        {type}
      </div>
      <Popover
        anchorEl={anchorEl}
        onClose={() => {}}
        placement={placement}
        open
      >
        Contents
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
      {placements.map((type) => (
        <div
          style={{
            width: "20%",
            height: "100px",
            margin: "4rem",
          }}
        >
          <Template type={type} placement={type} />
        </div>
      ))}
    </div>
  );
};
