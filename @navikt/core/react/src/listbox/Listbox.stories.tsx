import { Meta, StoryObj } from "@storybook/react/*";
import React from "react";
import { Search } from "../form/search";
import {
  Listbox,
  ListboxAnchor,
  ListboxOption,
  ListboxOptions,
} from "./Listbox";
import "./listbox.css";

export default {
  title: "ds-react/ListBox",
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Listbox>;

type Story = StoryObj<typeof Listbox>;

export const Items: Story = {
  render: () => {
    return (
      <div>
        <button>Placeholder</button>
        <Listbox role="listbox">
          <ListboxAnchor>
            <ListboxOptions>
              <ListboxOption className="l-item" value="value 1">
                Value 1
              </ListboxOption>
              <ListboxOption className="l-item" value="value 2">
                Value 2
              </ListboxOption>
              <ListboxOption className="l-item" value="value 3">
                Value 3
              </ListboxOption>
              <ListboxOption className="l-item" value="value 4">
                Value 4
              </ListboxOption>
            </ListboxOptions>
          </ListboxAnchor>
        </Listbox>
        <button>Placeholder</button>
        <Listbox mode="multiple" role="listbox">
          <ListboxAnchor>
            <ListboxOptions>
              <ListboxOption className="l-item" value="value 1">
                Value 1
              </ListboxOption>
              <ListboxOption className="l-item" value="value 2">
                Value 2
              </ListboxOption>
              <ListboxOption className="l-item" value="value 3">
                Value 3
              </ListboxOption>
              <ListboxOption className="l-item" value="value 4">
                Value 4
              </ListboxOption>
            </ListboxOptions>
          </ListboxAnchor>
        </Listbox>
        <button>Placeholder</button>
      </div>
    );
  },
};

export const Combobox: Story = {
  render: () => {
    return (
      <div>
        <button>Placeholder</button>
        <Listbox mode="multiple" role="combobox">
          <ListboxAnchor>
            <Search
              variant="simple"
              label="Combobox"
              htmlSize="20"
              autoComplete="off"
            />
          </ListboxAnchor>
          <ListboxOptions>
            <ListboxOption className="l-item" value="value 1">
              Value 1
            </ListboxOption>
            <ListboxOption className="l-item" value="value 2">
              Value 2
            </ListboxOption>
            <ListboxOption className="l-item" value="value 3">
              Value 3
            </ListboxOption>
            <ListboxOption className="l-item" value="value 4">
              Value 4
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
        <button>Placeholder</button>
      </div>
    );
  },
};
