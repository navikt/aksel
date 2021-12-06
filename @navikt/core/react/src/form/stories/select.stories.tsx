import React from "react";
import { Select } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/select",
  component: Select,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Select</h1>

      <Select label="Ipsum enim quis culpa">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <h2>Description</h2>

      <Select label="Ipsum enim quis culpa" description={<div>Aute enim</div>}>
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <h2>Errors</h2>

      <Select
        label="Ipsum enim quis culpa"
        description="Aute enim"
        error="Select error message"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <h2>Sizing</h2>

      <Select
        label="Ipsum enim quis culpa"
        description="Aute enim"
        error="Select error message"
        size="small"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <h2>hideLabel</h2>

      <Select label="Ipsum enim quis culpa" description="Aute enim" hideLabel>
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <h2>Disabled</h2>

      <Select label="Ipsum enim quis culpa" description="Aute enim" disabled>
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>
    </div>
  );
};
