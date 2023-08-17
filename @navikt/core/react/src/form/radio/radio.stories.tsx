/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Radio, RadioGroup } from "../../index";

export default {
  title: "ds-react/Radio",
  component: Radio,
  subcomponents: {
    RadioGroup,
  },
  argTypes: {
    size: { control: { type: "select", options: ["medium", "small"] } },
  },
} as Meta;

export const Default = {
  render: (props) => {
    const [state, setState] = useState("radio1");

    return (
      <RadioGroup
        legend={props.legend}
        description={props.description}
        value={props.controlled ? state : undefined}
        onChange={props.controlled ? setState : undefined}
        hideLegend={props.hideLegend}
        error={props.error ? "Errormelding" : undefined}
        size={props?.size}
      >
        <Radio value="radio1">{props.children || "Apple"}</Radio>
        <Radio
          value="radio2"
          description={
            props.radioDescription ? "Orange description" : undefined
          }
        >
          {props.children || "Orange"}
        </Radio>
        <Radio value="radio3">{props.children || "Banana"}</Radio>
        <Radio value="radio4">{props.children || "Melon"}</Radio>
      </RadioGroup>
    );
  },

  args: {
    controlled: false,
    error: false,
    size: "medium",
    legend: "Legend-tekst",
    radioDescription: false,
    hideLegend: false,
    children: "",
    description: "",
  },
};

export const Group = () => (
  <RadioGroup legend="Group legend" defaultValue="tekst2">
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupError = () => (
  <RadioGroup
    legend="Group legend"
    defaultValue="tekst2"
    error="Group errormelding"
  >
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupSmall = () => (
  <RadioGroup legend="Group legend" defaultValue="tekst2" size="small">
    <Radio value="tekst">Radiotekst</Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const GroupDescription = () => (
  <RadioGroup
    legend="Group legend"
    defaultValue="tekst2"
    description="Group description"
  >
    <Radio value="tekst" description="textdesc">
      Radiotekst
    </Radio>
    <Radio value="tekst2">Radiotekst</Radio>
  </RadioGroup>
);

export const UUDemo = () => (
  <div className="colgap">
    <RadioGroup
      legend="Hvilken frukt vil du ha?"
      description="Du kan bare velge en frukt"
      defaultValue="eple"
      readOnly
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="banan" description="Bananer er importert fra X">
        Banan
      </Radio>
      <Radio value="druer">Druer</Radio>
    </RadioGroup>
    <RadioGroup
      legend="Når har du ferie?"
      defaultValue="1"
      readOnly
      error="du må velge en ferie"
    >
      <Radio value="1">August</Radio>
      <Radio value="2">Juli</Radio>
      <Radio value="3">Juni</Radio>
    </RadioGroup>
  </div>
);

export const DifferentBackgroundDemo = () => (
  <div className="colgap">
    <RadioGroup
      legend="Hvem vant Rumpeldunkserien i første året til Harry Potter?"
      defaultValue="3"
    >
      <Radio value="1">Griffing</Radio>
      <Radio value="2">Smygard</Radio>
      <Radio value="3">Håsblås</Radio>
      <Radio value="4">Ravnklo</Radio>
    </RadioGroup>
    <RadioGroup
      legend="Hvilken frukt vil du ha?"
      defaultValue="eple"
      className="bg-blue-100"
      style={{ backgroundColor: "grey" }}
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="druer">Druer</Radio>
    </RadioGroup>
    <RadioGroup
      legend="Når har du ferie?"
      defaultValue="1"
      style={{ backgroundColor: "lightblue" }}
    >
      <Radio value="1">August</Radio>
      <Radio value="2">Juli</Radio>
    </RadioGroup>
  </div>
);
