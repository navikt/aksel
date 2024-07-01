import { Meta } from "@storybook/react";
import React from "react";
import { Alert } from "../alert";
import { Button } from "../button";
import { Search } from "../form/search";
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

export const Demo = () => (
  <div>
    <Tooltip content="Tooltip example" placement="top">
      <Alert variant="info">test</Alert>
    </Tooltip>
    <Tooltip content="Tooltip example" placement="top">
      <Search label="søk" />
    </Tooltip>
    <Tooltip content="Tooltip example" placement="top">
      <Button aria-describedby="test123">Tooltip</Button>
    </Tooltip>
  </div>
);

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
    <Tooltip
      content="Tooltip example Laboris reprehenderit sit sunt nisi velit mollit esse excepteur. "
      open={true}
      keys={["CMD", "I"]}
    >
      <div>Element</div>
    </Tooltip>
  );
};

export const Chromatic = () => {
  return (
    <VStack gap="24">
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
