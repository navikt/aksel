import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Listbox from "./Listbox";

const meta = {
  title: "Listbox",
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Listbox>
      <Listbox.Option>option1</Listbox.Option>
      <Listbox.Option>option2</Listbox.Option>
      <Listbox.Option>option3</Listbox.Option>
      <Listbox.Option>option4</Listbox.Option>
      <Listbox.Option>option5</Listbox.Option>
      <Listbox.Option>option6</Listbox.Option>
    </Listbox>
  ),
};
