import React, { useState } from "react";
import { Button } from "../button";
import { Popover } from "../index";

const placements = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
];
export default {
  title: "ds-react/Popover",
  component: Popover,
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
    arrow: {
      control: { type: "boolean" },
    },
    offset: {
      control: { type: "number" },
    },
    strategy: {
      defaultValue: "absolute",
      options: ["fixed", "absolute"],
      control: { type: "radio" },
    },
    placement: {
      defaultValue: "right",
      options: placements,
      control: { type: "radio" },
    },
  },
};

export const Default = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [open, setOpen] = useState(false);
  return (
    <div tabIndex={-1}>
      <Button ref={(el) => setAnchorEl(el)} onClick={() => setOpen((x) => !x)}>
        Open
      </Button>
      <Popover
        {...props}
        open={props.open ?? open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
      >
        <Popover.Content>Velit in consequat</Popover.Content>
      </Popover>
      &nbsp;
      <Button variant="secondary">Another button</Button>
    </div>
  );
};

const Template = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={(el) => setAnchorEl(el)}>X</Button>
      <Popover {...props} open anchorEl={anchorEl}>
        <Popover.Content>
          Velit in consequat Lorem
          <br />
          {props.placement}
        </Popover.Content>
      </Popover>
    </>
  );
};

export const Placement = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      {placements.map((placement) => (
        <Template key={placement} placement={placement} />
      ))}
    </div>
  );
};

export const Arrow = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      <Template arrow />
      <Template arrow={false} />
    </div>
  );
};

export const Offset = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      <Template arrow offset={30} />
      <Template arrow={false} offset={30} />
    </div>
  );
};
