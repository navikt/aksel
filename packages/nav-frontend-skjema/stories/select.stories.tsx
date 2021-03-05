import React from "react";
import { Select } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/Select",
  component: Select,
} as Meta;

export const select = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Select label="Hvilken land er best om sommeren?">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select
        label="Hvilken land er best om sommeren?"
        feil="Her er det noe feil"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select
        label="Hvilken land er best om sommeren?"
        description="En kort beskrivelse av listen"
      >
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <Select bredde="fullbredde" label="fullBredde">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="xxl" label="xxl">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="xl" label="xl">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="l" label="l">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="m" label="m">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="s" label="s">
        <option value="">Velg land</option>
      </Select>
      <Select bredde="xs" label="xs">
        <option value="">Velg land</option>
      </Select>
    </div>
  );
};
