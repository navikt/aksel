import React from "react";
import { Radio } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/radio",
  component: Radio,
} as Meta;

export const All = () => {
  return (
    <div>
      <fieldset>
        <Radio label="DoloreIn quis consectetur proident id adipisicing ut. Quis commodo enim amet pariatur ex consectetur. Aute nulla aliqua reprehenderit veniam tempor aute. Dolore non velit sint labore ipsum adipisicing est Lorem dolor. Lorem amet sunt exercitation." />
        <Radio size="s" label="Dolore Lorem amet sunt exercitation." />
        <Radio disabled size="s" label="Dolore Lorem amet sunt exercitation." />
      </fieldset>
    </div>
  );
};
