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
      wat
      <Checkbox>DoloreIn quis consectetur proident id adipisicing ut.</Checkbox>
      <Checkbox size="s">Dolore Lorem amet sunt exercitation.</Checkbox>
      <Checkbox disabled>Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox error="testerror">Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox disabled error="testerror">
        Dolore Lorem amet sunt exercitation
      </Checkbox>
    </div>
  );
};
