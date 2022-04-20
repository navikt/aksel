import React, { useState } from "react";
import { Radio, RadioGroup } from "../../index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/Form/Radio",
  component: Radio,
  subcomponents: {
    RadioGroup,
  },
} as Meta;

export const Default = (props) => {
  const [state, setState] = useState("radio1");

  return (
    <RadioGroup
      legend={props.legend}
      description={props.description}
      value={props.controlled ? state : undefined}
      onChange={props.controlled ? setState : undefined}
      hideLegend={props.hideLegend}
      error={props.errorGroup ? "Errormelding" : undefined}
      {...props}
    >
      <Radio value="radio1">{props.children || "Apple"}</Radio>
      <Radio
        value="radio2"
        description={props.radioDescription ? "Orange description" : undefined}
      >
        {props.children || "Orange"}
      </Radio>
      <Radio value="radio3">{props.children || "Banana"}</Radio>
      <Radio value="radio4">{props.children || "Melon"}</Radio>
    </RadioGroup>
  );
};

Default.args = {
  controlled: false,
  legend: "Legend-tekst",
  radioDescription: false,
  hideLegend: false,
  children: "",
  description: "",
};

export const Group = () => (
  <RadioGroup legend="Group legend" defaultValue={"tekst2"}>
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupError = () => (
  <RadioGroup
    legend="Group legend"
    defaultValue={"tekst2"}
    error="Group errormelding"
  >
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupSmall = () => (
  <RadioGroup legend="Group legend" defaultValue={"tekst2"} size="small">
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupDescription = () => (
  <RadioGroup
    legend="Group legend"
    defaultValue={"tekst2"}
    description="Group description"
  >
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);
