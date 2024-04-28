import { Meta } from "@storybook/react";
import React from "react";
import { Portal } from "../../portal";
import {
  Menu,
  MenuContent,
  MenuDivider,
  MenuProps,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "./Menu";
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

const Submenu: React.FC<
  MenuProps & { disabled?: boolean; heading?: string; id?: string }
> = (props) => {
  const {
    heading = "Submenu",
    open = true,
    onOpenChange,
    children,
    disabled,
    ...contentProps
  } = props;
  return (
    <MenuSub open={open} onOpenChange={onOpenChange}>
      <MenuSubTrigger style={itemStyles} disabled={disabled}>
        {heading} →
      </MenuSubTrigger>
      <Portal>
        <MenuSubContent style={contentStyles} {...contentProps}>
          {children}
        </MenuSubContent>
      </Portal>
    </MenuSub>
  );
};

export const Submenus = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  return (
    <div>
      <MenuWithAnchor>
        <MenuItem style={itemStyles} onSelect={() => window.alert("undo")}>
          Undo
        </MenuItem>
        <Submenu open={open1} onOpenChange={setOpen1} id="testid123">
          <MenuItem style={itemStyles}>Disabled</MenuItem>
          <MenuItem style={itemStyles} onSelect={() => window.alert("one")}>
            One
          </MenuItem>
          <Submenu open={open2} onOpenChange={setOpen2}>
            <MenuItem style={itemStyles} onSelect={() => window.alert("one")}>
              One
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("two")}>
              Two
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("three")}>
              Three
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("four")}>
              Four
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("five")}>
              Five
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("six")}>
              Six
            </MenuItem>
          </Submenu>
          <Submenu heading="Sub Menu" open={open3} onOpenChange={setOpen3}>
            <MenuItem style={itemStyles} onSelect={() => window.alert("one")}>
              One
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("two")}>
              Two
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("three")}>
              Three
            </MenuItem>
          </Submenu>
          <MenuItem style={itemStyles} onSelect={() => window.alert("two")}>
            Two
          </MenuItem>
          <Submenu open={open4} onOpenChange={setOpen4} disabled>
            <MenuItem style={itemStyles} onSelect={() => window.alert("one")}>
              One
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("two")}>
              Two
            </MenuItem>
            <MenuItem style={itemStyles} onSelect={() => window.alert("three")}>
              Three
            </MenuItem>
          </Submenu>
          <MenuItem style={itemStyles} onSelect={() => window.alert("three")}>
            Three
          </MenuItem>
        </Submenu>

        <MenuDivider style={dividerStyles} />
        <MenuItem
          style={itemStyles}
          disabled
          onSelect={() => window.alert("cut")}
        >
          Cut
        </MenuItem>
        <MenuItem style={itemStyles} onSelect={() => window.alert("copy")}>
          Copy
        </MenuItem>
        <MenuItem style={itemStyles} onSelect={() => window.alert("paste")}>
          Paste
        </MenuItem>
      </MenuWithAnchor>
    </div>
  );
};

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

const dividerStyles: React.CSSProperties = {
  height: 1,
  margin: "0.25rem 0.75rem",
  backgroundColor: "var(--a-gray-100)",
};
