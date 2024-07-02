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
        <DropdownMenu.Item onSelect={() => console.log("Item 1 clicked")}>
          <div data-test="123">item</div>
        </DropdownMenu.Item>
        <DropdownMenu.RadioGroup>
          <DropdownMenu.RadioItem value="1">Radio 1</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="2">Radio 2</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
