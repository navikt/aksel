import { Meta } from "@storybook/react";
import React from "react";
import { Button } from "../../button";
import { DropdownMenu } from "./DropdownMenu";

export default {
  title: "ds-react/DropdownMenu",
} satisfies Meta<typeof DropdownMenu>;

export const Demo = () => {
  return (
    <DropdownMenu open>
      <DropdownMenu.Trigger>
        <Button>Dropdown</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Lenker</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item onSelect={() => console.log("Item 1 clicked")}>
            Item 1
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => console.log("Item 2 clicked")}
            shortcut="⌘+S"
          >
            Item 2
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked>Checkbox</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem shortcut="⌘+S">
          Checkbox
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value="2">
          <DropdownMenu.RadioItem value="1">Radio 1</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="2">Radio 2</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

Demo.parameters = {
  layout: "padded",
};
