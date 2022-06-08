import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { Button } from "../..";
import { Tooltip } from "../index";

export default {
  title: "ds-react/Tooltip",
  component: Tooltip,
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    placement: {
      control: {
        type: "radio",
        options: ["top", "right", "bottom", "left"],
      },
    },
  },
} as Meta;

export const Default = (props) => {
  return (
    <Tooltip
      content="Tooltip example"
      open={props?.open}
      keys={props?.keys ? ["Cmd", "K"] : undefined}
      placement={props?.placement}
      arrow={props?.arrow}
      delay={props?.delay}
      offset={props?.offset}
    >
      <Button aria-describedby="test123">Tooltip</Button>
    </Tooltip>
  );
};

Default.args = {
  keys: false,
  arrow: true,
  delay: 150,
};

export const Placement = () => {
  return (
    <div className="colgap">
      <Tooltip content="Tooltip example" open={true} placement="top">
        <div>Element</div>
      </Tooltip>
      <Tooltip content="Tooltip example" open={true} placement="right">
        <div>Element</div>
      </Tooltip>
      <Tooltip content="Tooltip example" open={true} placement="left">
        <div>Element</div>
      </Tooltip>
      <Tooltip content="Tooltip example" open={true} placement="bottom">
        <div>Element</div>
      </Tooltip>
    </div>
  );
};

export const Keys = () => {
  return (
    <Tooltip content="Tooltip example" open={true} keys={["CMD", "K"]}>
      <div>Element</div>
    </Tooltip>
  );
};
