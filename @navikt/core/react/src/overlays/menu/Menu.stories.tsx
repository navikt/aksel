import { Meta } from "@storybook/react";
import React from "react";
import { Portal } from "../../portal";
import { Menu, MenuContent, MenuProps, MenuTrigger } from "./Menu";
import { MenuItem } from "./parts/Menu.Item";

const meta: Meta<typeof Menu> = {
  title: "Utilities/Menu",
  component: Menu,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

/* type Story = StoryObj<typeof Menu>; */

/* export const Default: Story = {
  render: (...props) => (
    <Collapsible {...props}>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        corporis maxime aliquam, voluptates nobis numquam, non odit optio
        architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
        tempore optio aliquid!
      </Collapsible.Content>
    </Collapsible>
  ),
  args: {
    open: false,
    defaultOpen: false,
  },
}; */

const MenuWithAnchor: React.FC<MenuProps> = (props) => {
  const { open = true, children, ...contentProps } = props;
  return (
    <Menu open={open} onOpenChange={() => null}>
      <MenuTrigger style={{ display: "inline-block" }}>Trigger</MenuTrigger>
      <Portal>
        <MenuContent
          style={contentStyles}
          onCloseAutoFocus={(event) => event.preventDefault()}
          align="start"
          {...contentProps}
        >
          {children}
        </MenuContent>
      </Portal>
    </Menu>
  );
};

export const Items = () => (
  <MenuWithAnchor>
    <MenuItem style={itemStyles} onSelect={() => window.alert("undo")}>
      <button>Undo</button>
    </MenuItem>
    <MenuItem style={itemStyles} onSelect={() => window.alert("redo")}>
      <button>Redo</button>
    </MenuItem>
    {/* <Menu.Separator className={separatorClass()} /> */}
    <MenuItem style={itemStyles} disabled onSelect={() => window.alert("cut")}>
      <button>Cut (disabled)</button>
    </MenuItem>
    <MenuItem style={itemStyles} onSelect={() => window.alert("copy")}>
      <button>Copy</button>
    </MenuItem>
    <MenuItem style={itemStyles} onSelect={() => window.alert("paste")}>
      <button>Paste</button>
    </MenuItem>
  </MenuWithAnchor>
);

const contentStyles: React.CSSProperties = {
  display: "block",
  minWidth: 150,
  background: "var(--a-gray-200)",
  border: "1px solid var(--a-border-subtle)",
  borderRadius: 4,
  padding: 4,
  boxShadow: "var(--a-shadow-small)",
};

const itemStyles: React.CSSProperties = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  height: 32,
  justifyContent: "space-between",
  padding: "0 8px",
  borderRadius: 3,
};
