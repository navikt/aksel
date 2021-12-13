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
    <Tooltip {...props} content={props.placement}>
      <Refresh aria-hidden />
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
        content="Controlled tooltip example"
        placement="auto-end"
        id="testid"
      >
        <Button
          aria-describedby="teststring"
          onClick={() => setOpen((x) => !x)}
        >
          Toggle tooltip
        </Button>
      </Tooltip>

      <h2>onOpenChange</h2>
      <Tooltip
        content="onOpenChangeTest"
        placement="auto-end"
        onOpenChange={console.log}
      >
        <Button>Tooltip</Button>
      </Tooltip>

      <h2>With disabled element</h2>
      <Tooltip content="disabled element example">
        <span>
          <Button style={{ pointerEvents: "none" }} disabled>
            Tooltip
          </Button>
        </span>
      </Tooltip>
    </div>
  );
};
