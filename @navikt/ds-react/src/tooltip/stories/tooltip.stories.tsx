import React, { useState } from "react";
import { Tooltip } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core";
import { Refresh } from "@navikt/ds-icons";
import { Button } from "../..";

export default {
  title: "ds-react/tooltip",
  component: Tooltip,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = (props) => {
  return (
    <Tooltip {...props} title={props.placement}>
      <Refresh />
    </Tooltip>
  );
};

export const All = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "4rem 8rem 4rem 8rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",

          gap: "3rem",
        }}
      >
        {placements.map((placement) => (
          <Template placement={placement} />
        ))}
      </div>
      <h2>Controlled</h2>
      <Tooltip
        open={open}
        title="Controlled tooltip example"
        placement="auto-end"
      >
        <Button onClick={() => setOpen((x) => !x)}>Toggle tooltip</Button>
      </Tooltip>
    </div>
  );
};
