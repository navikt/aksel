import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Accordion, Radio, RadioGroup } from "../../index";
import AccordionItem from "../../accordion/AccordionItem";
import AccordionHeader from "../../accordion/AccordionHeader";
import AccordionContent from "../../accordion/AccordionContent";

const meta: Meta<typeof Radio> = {
  title: "ds-react/Radio",
  component: Radio,
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
  },
};
export default meta;

export const Default = (props) => {
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
  error: false,
  size: "medium",
  legend: "Legend-tekst",
  radioDescription: false,
  hideLegend: false,
  children: "",
  description: "",
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

/**
 * Added to test bug where Radio labels are sometimes omitted from accessibility tree in Chrome when inside of an Accordion.
 * It was not possible to replicate using a Storybook-test.
 *
 * See https://nav-it.slack.com/archives/C7NE7A8UF/p1695723000232659
 */
export const TestInsideAccordion = () => (
  <Accordion>
    <AccordionItem>
      <AccordionHeader>Åpne for å velge</AccordionHeader>
      <AccordionContent>
        <RadioGroup legend="Velg én">
          <Radio value="1">Første valg</Radio>
          <Radio value="2">Andre valg</Radio>
          <Radio value="3">Tredje valg</Radio>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
