import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { RadioGroup, Radio } from "../index";
import { RadioGroupProps } from "../RadioGroup";
export default {
  title: "ds-react/form/radio",
  component: RadioGroup,
} as Meta;

export const All = () => {
  const Radios = (props: Omit<RadioGroupProps, "legend" | "children">) => (
    <RadioGroup
      legend="Mollit eiusmod"
      description={<div>"Exercitation do labore"</div>}
      {...props}
    >
      <Radio value={1}>Apple</Radio>
      <Radio value={false} description={<div>Laborum ad</div>}>
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
      <Radios defaultValue={1} />
      <h2>Disabled</h2>
      <RadioGroup legend="Mollit eiusmod" description="Exercitation do labore">
        <Radio value="Apple" disabled>
          Apple
        </Radio>
        <Radio value={false} description="Laborum ad" disabled>
          Orange
        </Radio>
        <Radio value="Melon">Melon</Radio>
      </RadioGroup>
      <h2>Disabled group</h2>
      <Radios disabled />
    </>
  );
};
