import { Meta } from "@storybook/react";
import React from "react";
import { Button } from "../../button";
import { DropdownMenu } from "./DropdownMenu";

export default {
  title: "ds-react/DropdownMenu",
} satisfies Meta<typeof DropdownMenu>;

export const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>Dropdown</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => console.log("Item 1 clicked")}>
          <div data-test="123">item</div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
