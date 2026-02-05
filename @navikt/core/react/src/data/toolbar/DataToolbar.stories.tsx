import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  ChevronDownIcon,
  CogIcon,
  RectangleSectionsIcon,
} from "@navikt/aksel-icons";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";
import { Select } from "../../form/select";
import { ActionMenu } from "../../overlays/action-menu";
import { Popover } from "../../popover";
import { Spacer, VStack } from "../../primitives/stack";
import { Tooltip } from "../../tooltip";
import { DataToolbar } from "./index";

const meta: Meta<typeof DataToolbar> = {
  title: "ds-react/Data/DataToolbar",
  component: DataToolbar,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataToolbar>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    return (
      <DataToolbar>
        <DataToolbar.Button
          ref={buttonRef}
          icon={<ChevronDownIcon aria-hidden />}
          onClick={() => setOpen(!open)}
        >
          Day job
        </DataToolbar.Button>
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={buttonRef.current}
        >
          <Popover.Content>
            <VStack gap="space-20">
              <Select label="Operator" size="small">
                <option value="is">er</option>
                <option value="is_not">er ikke</option>
              </Select>
              <CheckboxGroup legend="Verdier" size="small">
                <Checkbox value="1">Jedi Knight</Checkbox>
                <Checkbox value="2">Bounty Hunter</Checkbox>
                <Checkbox value="3">Sith Lord</Checkbox>
                <Checkbox value="4">TODO Combobox?</Checkbox>
              </CheckboxGroup>
            </VStack>
          </Popover.Content>
        </Popover>

        <DataToolbar.SearchField label="Tekstfilter" />

        <Spacer />

        <Tooltip content="En toggle">
          <DataToolbar.ToggleButton icon={<RectangleSectionsIcon />} />
        </Tooltip>

        <ActionMenu>
          <ActionMenu.Trigger>
            <DataToolbar.Button
              icon={<CogIcon aria-hidden />}
              tooltip="Innstillinger"
            />
          </ActionMenu.Trigger>
          <ActionMenu.Content>
            <ActionMenu.Item onSelect={() => alert("Item 1 selected")}>
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => alert("Item 2 selected")}>
              Item 2
            </ActionMenu.Item>
          </ActionMenu.Content>
        </ActionMenu>
      </DataToolbar>
    );
  },
};
