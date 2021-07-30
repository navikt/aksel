import React from "react";
import { Checkbox, CheckboxGroup } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/checkbox",
  component: Checkbox,
} as Meta;

export const All = () => {
  return (
    <>
      <Checkbox>DoloreIn quis consectetur proident id adipisicing ut.</Checkbox>
      <Checkbox size="s">Dolore Lorem amet sunt exercitation.</Checkbox>
      <Checkbox disabled>Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox error="testerror">Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox error="testerror" size="s">
        Dolore Lorem amet sunt exercitation
      </Checkbox>
      <Checkbox disabled error="testerror">
        Dolore Lorem amet sunt exercitation
      </Checkbox>
      <Checkbox disabled checked>
        Dolore Lorem amet sunt exercitation
      </Checkbox>

      <CheckboxGroup legend="Checkbox group">
        <Checkbox>Apple</Checkbox>
        <Checkbox checked>Banana</Checkbox>
        <Checkbox checked>Orange</Checkbox>
        <Checkbox>Melon</Checkbox>
        <Checkbox disabled>Cherry</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
      >
        <Checkbox>Apple</Checkbox>
        <Checkbox checked>Banana</Checkbox>
        <Checkbox checked>Orange</Checkbox>
        <Checkbox>Melon</Checkbox>
        <Checkbox disabled>Cherry</Checkbox>
      </CheckboxGroup>
    </>
  );
};
