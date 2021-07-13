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
      <Select>
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select size="s">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select label="Hvilken land er best om sommeren?">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select
        label="Hvilken land er best om sommeren?"
        description="Velg hvilket land som er best"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select
        size="s"
        label="Hvilken land er best om sommeren?"
        description="Velg hvilket land som er best"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>

      {/* <Checkbox label="DoloreIn quis consectetur proident id adipisicing ut. Quis commodo enim amet pariatur ex consectetur. Aute nulla aliqua reprehenderit veniam tempor aute. Dolore non velit sint labore ipsum adipisicing est Lorem dolor. Lorem amet sunt exercitation." />
      <Checkbox size="s" label="Dolore Lorem amet sunt exercitation." />
      <Checkbox
        disabled
        size="s"
        label="Dolore Lorem amet sunt exercitation."
      /> */}
    </div>
  );
};
