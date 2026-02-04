import { Meta } from "@storybook/react-vite";
import React from "react";
import { Button } from "../button";
import { VStack } from "../layout/stack";
import Tooltip from "./Tooltip";

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
      },
      options: ["top", "right", "bottom", "left"],
    },
  },
} satisfies Meta<typeof Tooltip>;

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
      describesChild={props?.describesChild}
    >
      <Button>Tooltip</Button>
    </Tooltip>
  );
};
Default.args = {
  keys: false,
  arrow: true,
  delay: 150,
  describesChild: true,
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
    <div>
      <Tooltip
        content="Tooltip example with keys"
        keys={["CMD", "I"]}
        open={true}
      >
        <button>Element</button>
      </Tooltip>
      <Tooltip
        content="Tooltip example with multiple keys"
        keys={[["CMD", "I"], ["Home"]]}
        open={true}
        placement="bottom"
      >
        <button>Element</button>
      </Tooltip>
    </div>
  );
};

export const Chromatic = () => {
  return (
    <VStack gap="space-96">
      <div>
        <h2>Default</h2>
        <Default />
      </div>
      <div>
        <h2>Placement</h2>
        <Placement />
      </div>
      <div>
        <h2>Keys</h2>
        <Keys />
      </div>
    </VStack>
  );
};

Chromatic.parameters = {
  chromatic: { disable: false },
};
