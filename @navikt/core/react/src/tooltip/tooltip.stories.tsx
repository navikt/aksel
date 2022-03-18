import React, { useState } from "react";
import { Tooltip } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Refresh } from "@navikt/ds-icons";
import { Button } from "../..";

export default {
  title: "ds-react/tooltip",
  component: Tooltip,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const Demo = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        width: "100vw",
        height: "200vh",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip
        content="Tooltip example"
        keys={["Cmd", "K"]}
        side="right"
        open={open}
        onOpenChange={setOpen}
      >
        <Button onClick={() => setOpen(!open)}>Tooltip C</Button>
      </Tooltip>
      <div>
        <Tooltip
          side="top"
          keys={["Cmd", "K"]}
          content="Tooltip example with long text"
        >
          <Button>Tooltip</Button>
        </Tooltip>
        <Tooltip
          content="Tooltip example with long text"
          side="right"
          open={open}
          keys={["Cmd", "K"]}
        >
          <Button>Tooltip</Button>
        </Tooltip>
      </div>

      <Tooltip content="Tooltip example" side="right" keys={["Cmd", "K"]}>
        <Button>Tooltip</Button>
      </Tooltip>

      <Tooltip content="Tooltip example" side="bottom" open={open}>
        <Button>Tooltip</Button>
      </Tooltip>

      <Tooltip side="left" content="Tooltip example with long text" open={open}>
        <Button>Tooltip</Button>
      </Tooltip>
    </div>
  );
};

export const All = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "4rem 8rem 4rem 8rem" }}>
      <h2>Controlled</h2>
      <Tooltip open={open} content="Controlled tooltip example" side="top">
        <Button onClick={() => setOpen((x) => !x)}>Toggle tooltip</Button>
      </Tooltip>

      <h2>onOpenChange</h2>
      <Tooltip content="onOpenChangeTest" side="top" onOpenChange={console.log}>
        <Button>Tooltip</Button>
      </Tooltip>
      <h2>no arrow</h2>
      <Tooltip content="no arrow" side="top" arrow={false}>
        <Button>Tooltip</Button>
      </Tooltip>

      <h2>Keys</h2>
      <Tooltip content="Inverted!" side="top" open keys={["Cmd", "K"]}>
        <Button>Inverted tooltip</Button>
      </Tooltip>
      <h3>inverted</h3>
      <Tooltip inverted content="Inverted!" side="top" open keys={["Cmd", "K"]}>
        <Button>Inverted tooltip</Button>
      </Tooltip>

      <h2>Inverted</h2>
      <Tooltip inverted content="Inverted!" side="top" open>
        <Button>Inverted tooltip</Button>
      </Tooltip>

      <h2>With disabled element</h2>
      <div>
        <Tooltip content="disabled element example">
          <span tabIndex={0}>
            <Button style={{ pointerEvents: "none" }} disabled>
              Tooltip
            </Button>
          </span>
        </Tooltip>
      </div>
      <h2>all sides</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "3rem",
        }}
      >
        {["top", "left", "bottom", "right"].map((side) => (
          <div key={side}>
            <h3>{side}</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "3rem",
              }}
            >
              <Tooltip key={side} defaultOpen content={side} side={side as any}>
                <Refresh aria-hidden tabIndex={0} />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UUDemo = () => {
  return (
    <div>
      <Button>Placeholder</Button>
      <br />
      <br />
      <Tooltip content="Shortcut" side="right" keys={["Cmd", "S"]}>
        <Button>Lagre</Button>
      </Tooltip>
      <br />
      <br />
      <Button>Placeholder</Button>
    </div>
  );
};
