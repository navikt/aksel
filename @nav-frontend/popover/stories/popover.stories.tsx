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
      <Popover anchor={anchor}>
        <p>Dette er en popover.</p>
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoColumns: "100%",
        gridAutoRows: "30px",
        rowGap: "4rem",
        margin: "4rem",
      }}
    >
      <Template />
    </div>
  );
};
