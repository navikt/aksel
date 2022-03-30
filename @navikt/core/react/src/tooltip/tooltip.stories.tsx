import React, { useRef, useState } from "react";
import { Tooltip } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Refresh } from "@navikt/ds-icons";
import { Button } from "../..";
import { ToggleGroup } from "../toggle-group";

export default {
  title: "ds-react/tooltip",
  component: Tooltip,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const Demo = () => {
  const [open, setOpen] = useState(true);
  const testRef = useRef(null);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
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
        placement="right"
        open={open}
        ref={testRef}
      >
        <Button aria-describedby="test123" onClick={() => setOpen(!open)}>
          Tooltip C
        </Button>
      </Tooltip>
      <Tooltip
        content="Tooltip example"
        keys={["Cmd", "K"]}
        placement="right"
        defaultOpen
      >
        <Button onClick={() => console.log(testRef.current)}>Tooltip C</Button>
      </Tooltip>
      <ToggleGroup onChange={null} defaultValue="321">
        <Tooltip content="Tooltip" placement="bottom">
          <ToggleGroup.Item value="123">Tekst</ToggleGroup.Item>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <ToggleGroup.Item value="321">tekst 2</ToggleGroup.Item>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <ToggleGroup.Item value="3212">tekst 2</ToggleGroup.Item>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <ToggleGroup.Item value="3213">tekst 2</ToggleGroup.Item>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <ToggleGroup.Item value="3214">tekst 2</ToggleGroup.Item>
        </Tooltip>
      </ToggleGroup>
    </div>
  );
};

export const All = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "4rem 8rem 4rem 8rem" }}>
      <h2>Controlled</h2>
      <Tooltip open={open} content="Controlled tooltip example" placement="top">
        <Button onClick={() => setOpen((x) => !x)}>Toggle tooltip</Button>
      </Tooltip>

      <h2>no arrow</h2>
      <Tooltip content="no arrow" placement="top" arrow={false}>
        <Button>Tooltip</Button>
      </Tooltip>

      <h2>Keys</h2>
      <Tooltip content="Tooltip" placement="top" open keys={["Cmd", "K"]}>
        <Button>Tooltip</Button>
      </Tooltip>
      <h2>more offset</h2>
      <Tooltip content="Tooltip" placement="top" open offset={20}>
        <Button>Tooltip</Button>
      </Tooltip>

      <h2>all placements</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "3rem",
        }}
      >
        {["top", "left", "bottom", "right"].map((placement) => (
          <div key={placement}>
            <h3>{placement}</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "3rem",
              }}
            >
              <Tooltip
                key={placement}
                defaultOpen
                content={placement}
                placement={placement as any}
              >
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
      <Tooltip content="Shortcut" placement="right" keys={["Cmd", "S"]}>
        <Button>Lagre</Button>
      </Tooltip>
      <br />
      <br />
      <Button>Placeholder</Button>
    </div>
  );
};
