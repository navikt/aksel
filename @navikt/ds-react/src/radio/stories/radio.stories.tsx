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
        <Radio name="test" label="DoloreIn quis consectetur." />
        <Radio
          name="test"
          size="s"
          label="Dolore Lorem amet sunt exercitation."
        />
        <Radio
          name="test"
          disabled
          size="s"
          label="Dolore Lorem amet sunt exercitation."
        />
      </fieldset>
    </div>
  );
};
