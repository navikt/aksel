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
        ref={test}
        label="DoloreIn quis consectetur proident id adipisicing ut. Quis commodo enim amet pariatur ex consectetur. Aute nulla aliqua reprehenderit veniam tempor aute. Dolore non velit sint labore ipsum adipisicing est Lorem dolor. Lorem amet sunt exercitation."
      />
      <Checkbox size="s" label="Dolore Lorem amet sunt exercitation." />
      <Checkbox
        disabled
        size="s"
        label="Dolore Lorem amet sunt exercitation."
      />
    </div>
  );
};
