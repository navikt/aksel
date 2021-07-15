import React from "react";
import { Checkbox } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/checkbox",
  component: Checkbox,
} as Meta;

export const All = () => {
  return (
    <div>
      <Checkbox
        label="DoloreIn quis consectetur proident id adipisicing ut. "
        error="testerror"
      />
      <Checkbox
        size="s"
        label="Dolore Lorem amet sunt exercitation."
        error="testerror"
      />
      <Checkbox
        disabled
        error="testerror"
        size="s"
        label="Dolore Lorem amet sunt exercitation."
      />
    </div>
  );
};
