import { Meta, StoryObj } from "@storybook/react/*";
import React from "react";
import { Listbox, ListboxOption, ListboxOptions } from "./Listbox";

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
        <button onClick={console.log}>Focus before</button>
        <Listbox>
          <style>
            {`
          [data-focused="true"]{
            outline: 2px solid blue;
          }
          [data-selected="true"]{
            color: blue;
          }

          *:focus {
              outline: 0;

          `}
          </style>
          <ListboxOptions>
            <ListboxOption value="value 1">Value 1</ListboxOption>
            <ListboxOption value="value 2">Value 2</ListboxOption>
            <ListboxOption value="value 3">Value 3</ListboxOption>
            <ListboxOption value="value 4">Value 4</ListboxOption>
          </ListboxOptions>
        </Listbox>
        <button>123</button>
        <Listbox mode="multiple">
          <style>
            {`
          [data-focused="true"]{
            outline: 2px solid blue;
          }
          [data-selected="true"]{
            color: blue;
          }

          *:focus {
              outline: 0;

          `}
          </style>
          <ListboxOptions>
            <ListboxOption value="value 1">Value 1</ListboxOption>
            <ListboxOption value="value 2">Value 2</ListboxOption>
            <ListboxOption value="value 3">Value 3</ListboxOption>
            <ListboxOption value="value 4">Value 4</ListboxOption>
          </ListboxOptions>
        </Listbox>
        <button>Focus after</button>
      </div>
    );
  },
};
