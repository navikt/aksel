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
        disabled
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
        <option value="Bosnia-Hercegovina">Bosnia-Hercegovina</option>
      </Select>
      <Select
        label="Hvilken land er best om sommeren?"
        error="Danmark er feil svar"
        value="danmark"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
    </div>
  );
};
