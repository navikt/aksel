import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { Accordion } from "../../accordion";
import AccordionContent from "../../accordion/AccordionContent";
import AccordionHeader from "../../accordion/AccordionHeader";
import AccordionItem from "../../accordion/AccordionItem";
import VStack from "../../layout/stack/VStack";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import Radio from "./Radio";
import RadioGroup, { RadioGroupProps } from "./RadioGroup";

const meta: Meta<typeof Radio> = {
  title: "ds-react/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

interface Props extends RadioGroupProps {
  controlled?: boolean;
  error?: boolean;
  radioDescription?: boolean;
  radioChildren?: string;
}

export const Default: StoryFn<Props> = (props) => {
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
      <Radio value="radio1">{props.radioChildren || "Apple"}</Radio>
      <Radio
        value="radio2"
        description={props.radioDescription ? "Orange description" : undefined}
      >
        {props.radioChildren || "Orange"}
      </Radio>
      <Radio value="radio3">{props.radioChildren || "Banana"}</Radio>
      <Radio value="radio4">{props.radioChildren || "Melon"}</Radio>
    </RadioGroup>
  );
};
Default.args = {
  controlled: false,
  error: false,
  size: "medium",
  legend: "Legend-tekst",
  hideLegend: false,
  description: "",
  radioChildren: "",
  radioDescription: false,
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: { type: "radio" },
  },
};

export const Group = () => (
  <VStack gap="space-16">
    <RadioGroup legend="Group legend" defaultValue="tekst2">
      <Radio value="tekst">Radiotekst</Radio>
      <Radio value="tekst2">Radiotekst</Radio>
    </RadioGroup>
    <RadioGroup legend="Group legend" defaultValue="tekst2" size="small">
      <Radio value="tekst">Radiotekst</Radio>
      <Radio value="tekst2">Radiotekst</Radio>
    </RadioGroup>
  </VStack>
);

export const GroupError = () => {
  return (
    <VStack gap="space-16">
      <RadioGroup
        legend="Velg din aldersgruppe"
        error="Du må velge en aldersgruppe"
        defaultValue="21-45"
      >
        <Radio value="0-20">0-20 år</Radio>
        <Radio value="21-45">21-45 år</Radio>
        <Radio value="46-100">46-100 år</Radio>
      </RadioGroup>
      <RadioGroup
        legend="Velg din aldersgruppe"
        error="Du må velge en aldersgruppe"
        defaultValue="21-45"
        size="small"
      >
        <Radio value="0-20">0-20 år</Radio>
        <Radio value="21-45">21-45 år</Radio>
        <Radio value="46-100">46-100 år</Radio>
      </RadioGroup>
    </VStack>
  );
};

export const GroupErrorDynamic = () => {
  const [isValueSelected, setValueSelected] = useState(false);
  return (
    <RadioGroup
      legend="Velg din aldersgruppe"
      description="Informasjonen blir brukt for å gi deg bedre søketreff."
      error={!isValueSelected ? "Du må velge en aldersgruppe" : undefined}
    >
      <Radio onChange={() => setValueSelected(true)} value="0-20">
        0-20 år
      </Radio>
      <Radio
        onChange={() => setValueSelected(true)}
        value="21-45"
        description="Gjelder fra året man blir 21"
      >
        21-45 år
      </Radio>
      <Radio onChange={() => setValueSelected(true)} value="46-100">
        46-100 år
      </Radio>
    </RadioGroup>
  );
};

export const GroupDescription = () => (
  <VStack gap="space-16">
    <RadioGroup
      legend="Group legend"
      defaultValue="tekst2"
      description="Group description"
    >
      <Radio value="tekst" description="Radiodesc">
        Radiotekst
      </Radio>
      <Radio value="tekst2">Radiotekst</Radio>
    </RadioGroup>
    <RadioGroup
      legend="Group legend"
      defaultValue="tekst2"
      description="Group description"
      size="small"
    >
      <Radio value="tekst" description="Radiodesc">
        Radiotekst
      </Radio>
      <Radio value="tekst2">Radiotekst</Radio>
    </RadioGroup>
  </VStack>
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

export const Readonly = () => (
  <VStack gap="space-16">
    <RadioGroup legend="Hvilken frukt liker du?" defaultValue="banan" readOnly>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple" description="Rød, grønn eller gul.">
        Eple
      </Radio>
    </RadioGroup>
    <RadioGroup
      legend="Hvilken frukt liker du?"
      error="feilmelding"
      defaultValue="eple"
      readOnly
      size="small"
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="banan">Banan</Radio>
    </RadioGroup>
  </VStack>
);

export const Disabled = () => (
  <VStack gap="space-16">
    <RadioGroup legend="Hvilken frukt liker du?" defaultValue="banan" disabled>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple" description="Rød, grønn eller gul.">
        Eple
      </Radio>
    </RadioGroup>
    <RadioGroup
      legend="Hvilken frukt liker du?"
      error="feilmelding"
      defaultValue="eple"
      disabled
      size="small"
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="banan">Banan</Radio>
    </RadioGroup>
  </VStack>
);

export const ColorRole = () => (
  <VStack gap="space-16" data-color="brand-magenta">
    <RadioGroup legend="Default" defaultValue="v2">
      <Radio value="v1">Radiotekst</Radio>
      <Radio value="v2" description="Radiodesc">
        Radiotekst
      </Radio>
    </RadioGroup>

    <RadioGroup legend="ReadOnly" defaultValue="banan" readOnly>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple">Eple</Radio>
    </RadioGroup>

    <RadioGroup legend="Disabled" defaultValue="banan" disabled>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple">Eple</Radio>
    </RadioGroup>

    <RadioGroup legend="Error" error="Du må velge en aldersgruppe">
      <Radio value="0-20">0-49 år</Radio>
      <Radio value="46-100">50-100 år</Radio>
    </RadioGroup>
  </VStack>
);

export const Chromatic = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Readonly,
  Disabled,
  ColorRole,
});

export const ChromaticLight = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Readonly,
  Disabled,
  ColorRole,
});
ChromaticLight.globals = { theme: "light", mode: "darkside" };

export const ChromaticDark = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Readonly,
  Disabled,
  ColorRole,
});
ChromaticDark.globals = { theme: "dark", mode: "darkside" };
