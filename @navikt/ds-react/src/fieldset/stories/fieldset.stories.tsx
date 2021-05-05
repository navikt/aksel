import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/Fieldset",
  component: Fieldset,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset>
        <input />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </Fieldset>
    </div>
  );
};
