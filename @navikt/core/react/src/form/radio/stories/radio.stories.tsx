import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { RadioGroup, Radio } from "../index";
export default {
  title: "ds-react/form/radio",
  component: RadioGroup,
} as Meta;

export const All = () => {
  const Radios = (props) => (
    <RadioGroup
      legend="Mollit eiusmod"
      description="Exercitation do labore"
      {...props}
    >
      <Radio value="Apple">Apple</Radio>
      <Radio value="Orange" description="Laborum ad">
        Orange
      </Radio>
      <Radio value="Melon">Melon</Radio>
    </RadioGroup>
  );

  return (
    <>
      <h1>Radio group</h1>
      <Radios />
      <h2>Error</h2>
      <Radios error="Dette er en feilmelding" />
      <h2>Small</h2>
      <Radios size="small" />
      <h2>Small + error</h2>
      <Radios size="small" error="Dette er en feilmelding" />
      <h2>Default value</h2>
      <Radios defaultValue="Orange" />
      <h2>Disabled</h2>
      <RadioGroup legend="Mollit eiusmod" description="Exercitation do labore">
        <Radio value="Apple" disabled>
          Apple
        </Radio>
        <Radio value="Orange" description="Laborum ad" disabled>
          Orange
        </Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>Disabled group</h2>
      <Radios disabled />
    </>
  );
};
