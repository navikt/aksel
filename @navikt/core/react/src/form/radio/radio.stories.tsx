import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Accordion } from "../../accordion";
import AccordionContent from "../../accordion/AccordionContent";
import AccordionHeader from "../../accordion/AccordionHeader";
import AccordionItem from "../../accordion/AccordionItem";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

const meta: Meta<typeof Radio> = {
  title: "ds-react/Radio",
  component: Radio,
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

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

export const GroupError = () => {
  const [isValueSelected, setValueSelected] = useState(false);
  return (
    <>
      <div>
        <h2>Static error</h2>
        <RadioGroup
          legend="Velg din aldersgruppe"
          description="Informasjonen blir brukt for å gi deg bedre søketreff."
          error="Du må velge en aldersgruppe"
          defaultValue="21-45"
        >
          <Radio value="0-20">0-20 år</Radio>
          <Radio value="21-45" description="Gjelder fra året man blir 21">
            21-45 år
          </Radio>
          <Radio value="46-100">46-100 år</Radio>
        </RadioGroup>
      </div>
      <div>
        <h2>Dynamic error</h2>
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
      </div>
    </>
  );
};

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

export const Readonly = () => (
  <div className="colgap">
    <RadioGroup legend="Hvilken frukt liker du?" defaultValue="banan" readOnly>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple">Eple</Radio>
      <Radio value="druer">Druer</Radio>
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
  </div>
);

export const Disabled = () => (
  <div className="colgap">
    <RadioGroup legend="Hvilken frukt liker du?" defaultValue="banan" disabled>
      <Radio value="banan">Banan</Radio>
      <Radio value="eple" description="Rød, grønn eller gul.">
        Eple
      </Radio>
      <Radio value="druer">Druer</Radio>
    </RadioGroup>
    <RadioGroup
      legend="Hvilken frukt liker du?"
      error="feilmelding"
      defaultValue="eple"
      disabled
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="banan">Banan</Radio>
    </RadioGroup>
  </div>
);

export const ColorRole = () => (
  <div className="colspan" data-color="brand-magenta">
    <div>
      <h2>Group</h2>
      <Group />
    </div>
    <div>
      <h2>GroupError</h2>
      <GroupError />
    </div>
    <div>
      <h2>Readonly</h2>
      <Readonly />
    </div>
    <div>
      <h2>Disabled</h2>
      <Disabled />
    </div>
  </div>
);

export const Chromatic: Story = {
  render: () => (
    <div>
      <div>
        <h2>Default</h2>
        <Default />
      </div>
      <div>
        <h2>Group</h2>
        <Group />
      </div>
      <div>
        <h2>GroupError</h2>
        <GroupError />
      </div>
      <div>
        <h2>GroupSmall</h2>
        <GroupSmall />
      </div>
      <div>
        <h2>GroupDescription</h2>
        <GroupDescription />
      </div>
      <div>
        <h2>UUDemo</h2>
        <UUDemo />
      </div>
      <div>
        <h2>TestInsideAccordion</h2>
        <TestInsideAccordion />
      </div>
      <div>
        <h2>Readonly</h2>
        <Readonly />
      </div>
      <div>
        <h2>Disabled</h2>
        <Disabled />
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
