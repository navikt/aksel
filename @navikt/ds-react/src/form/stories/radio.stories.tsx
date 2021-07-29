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
        <Radio name="test">DoloreIn quis consectetur.</Radio>
        <Radio name="test" size="s">
          Dolore Lorem amet sunt exercitation.
        </Radio>
        <Radio name="test" disabled size="s">
          Dolore Lorem amet sunt exercitation.
        </Radio>
      </fieldset>
    </div>
  );
};
