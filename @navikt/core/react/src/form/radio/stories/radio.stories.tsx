import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { RadioGroup, Radio } from "../index";
export default {
  title: "ds-react/form/radio",
  component: RadioGroup,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>Radios</h1>
      <RadioGroup legend="Mollit eiusmod">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>description</h2>
      <RadioGroup legend="Mollit eiusmod" description="Exercitation do labore">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange" description="Laborum ad">
          Orange
        </Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <RadioGroup
        size="small"
        legend="Mollit eiusmod"
        description="Exercitation do labore"
      >
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange" description="Laborum ad">
          Orange
        </Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>error</h2>
      <RadioGroup legend="Mollit eiusmod" error="Boks nr 2 må være valgt">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>Sizing</h2>
      <RadioGroup
        legend="Mollit eiusmod"
        error="Boks nr 2 må være valgt"
        size="small"
        description="wat"
      >
        <Radio value="Apple" description="Description">
          Apple
        </Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>defaultValue</h2>
      <RadioGroup legend="Mollit eiusmod" defaultValue="Orange">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>hideLenged</h2>
      <RadioGroup legend="Mollit eiusmod" hideLegend>
        <Radio value="Apple">Apple</Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>Disabled</h2>
      <RadioGroup
        errorPropagation={true}
        legend="Mollit eiusmod"
        description="Mollit eiusmod"
        disabled
        value="Orange"
      >
        <Radio value="Apple" description="description">
          Apple
        </Radio>
        <Radio value="Orange" checked description="description">
          Orange
        </Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <RadioGroup legend="Mollit eiusmod">
        <Radio value="Apple" disabled>
          Apple
        </Radio>
        <Radio value="Orange">Orange</Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
    </>
  );
};
