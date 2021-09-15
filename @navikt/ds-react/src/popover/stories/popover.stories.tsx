import React, { useState } from "react";
import { Popover } from "../index";
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
          background: "var(--navds-color-gray-60)",
          textAlign: "center",
          width: "2rem",
          height: "2rem",
        }}
        ref={(el) => setAnchorEl(el)}
      ></div>
      <Popover {...props} anchorEl={anchorEl} onClose={() => {}} open>
        <Popover.Content>{props.placement}</Popover.Content>
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
        gap: "4rem",
      }}
    >
      {placements.map((placement) => (
        <div
          style={{
            width: "20%",
            height: "100px",
          }}
        >
          <Template placement={placement} />
        </div>
      ))}
    </div>
  );
};
