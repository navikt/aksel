import { Meta } from "@storybook/react";
import React from "react";
import { Tooltip, Alert, Button, Search } from "..";

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
      content="Tooltip example Laboris reprehenderit sit sunt nisi velit mollit esse excepteur. Consectetur ullamco quis laboris enim nulla amet proident proident deserunt laborum. Aliqua adipisicing ipsum nisi ipsum nisi pariatur tempor amet aute labore laboris eiusmod adipisicing eu. Et cillum ipsum voluptate ea irure aliquip laboris mollit in. Voluptate tempor do voluptate reprehenderit ea dolor velit ullamco et magna enim ut sit. Pariatur culpa nulla consectetur voluptate id Lorem incididunt magna aliqua sunt ut Lorem. Laborum est quis aute enim et fugiat aute."
      open={true}
      keys={["CMD", "K"]}
    >
      <div>Element</div>
    </Tooltip>
  );
};
