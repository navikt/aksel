import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";

const meta: Meta<typeof Checkbox> = {
  title: "ds-react/Checkbox",
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Default = (props) => {
  const [state, setState] = useState(["checkbox1"]);

  return (
    <div>
      <CheckboxGroup
        legend={props.legend}
        description={props.description}
        value={props.controlled ? state : undefined}
        onChange={props.controlled ? setState : undefined}
        hideLegend={props.hideLegend}
        error={props.errorGroup ? "Errormelding for checkboxgruppe" : undefined}
        size={props?.size}
      >
        <Checkbox
          value="checkbox1"
          indeterminate={props.indeterminate}
          hideLabel={props.hideLabel}
        >
          {props.children || "Apple"}
        </Checkbox>
        <Checkbox
          value="checkbox2"
          error={props.errorSingle}
          description={
            props.checkboxDescription
              ? "Quis laborum culpa enim amet cillum veniam."
              : undefined
          }
          indeterminate={props.indeterminate}
          hideLabel={props.hideLabel}
        >
          {props.children || "Orange"}
        </Checkbox>
        <Checkbox
          value="checkbox3"
          indeterminate={props.indeterminate}
          hideLabel={props.hideLabel}
        >
          {props.children || "Banana"}
        </Checkbox>
        <Checkbox
          value="checkbox4"
          indeterminate={props.indeterminate}
          hideLabel={props.hideLabel}
        >
          {props.children || "Melon"}
        </Checkbox>
      </CheckboxGroup>
    </div>
  );
};
Default.args = {
  controlled: false,
  legend: "Legend-tekst",
  checkboxDescription: false,
  hideLabel: false,
  hideLegend: false,
  errorSingle: false,
  errorGroup: false,
  children: "",
  description: "",
};

export const Group = () => (
  <CheckboxGroup legend="Group legend" defaultValue={["tekst2"]}>
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst2">Checkboxtekst</Checkbox>
  </CheckboxGroup>
);

export const GroupError = () => (
  <CheckboxGroup
    legend="Group legend"
    defaultValue={["tekst2"]}
    error="Group errormelding"
  >
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst2">Checkboxtekst</Checkbox>
  </CheckboxGroup>
);

export const GroupSmall = () => (
  <CheckboxGroup legend="Group legend" defaultValue={["tekst2"]} size="small">
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst2">Checkboxtekst</Checkbox>
  </CheckboxGroup>
);

export const GroupDescription = () => (
  <CheckboxGroup
    legend="Group legend"
    defaultValue={["tekst2"]}
    description="Group description"
  >
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst2">Checkboxtekst</Checkbox>
  </CheckboxGroup>
);

export const Single = () => (
  <div className="colspan">
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst" defaultChecked>
      Checkboxtekst
    </Checkbox>
  </div>
);

export const SingleSmall = () => (
  <div className="colspan">
    <Checkbox value="tekst" size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked size="small">
      Checkboxtekst
    </Checkbox>
  </div>
);

export const SingleDescription = () => {
  const [isValueSelected, setValueSelected] = useState(false);
  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      className="colspan"
      error={!isValueSelected ? "Du må velge en sitteplass" : undefined}
    >
      <Checkbox
        onChange={() => setValueSelected(true)}
        value="foran"
        description="Tilgjengelig med rullestol"
      >
        Foran
      </Checkbox>
      <Checkbox
        onChange={() => setValueSelected(true)}
        value="tekst"
        description="Adgang via trapp med to trinn"
      >
        Bak
      </Checkbox>
    </CheckboxGroup>
  );
};

export const Indeterminate = () => {
  const [checked, setChecked] = useState([true, false]);

  return (
    <>
      <Checkbox
        checked={checked[0] && checked[1]}
        indeterminate={checked[0] !== checked[1]}
        onChange={(e) => setChecked([e.target.checked, e.target.checked])}
      >
        Parent
      </Checkbox>
      <div style={{ paddingLeft: "2rem" }}>
        <Checkbox
          checked={checked[0]}
          onChange={(e) => setChecked([e.target.checked, checked[1]])}
        >
          Child 1
        </Checkbox>
        <Checkbox
          checked={checked[1]}
          onChange={(e) => setChecked([checked[0], e.target.checked])}
        >
          Child 2
        </Checkbox>
      </div>
      <Checkbox indeterminate size="small" description="With description">
        Indeterminate small
      </Checkbox>
    </>
  );
};

export const Readonly = () => (
  <div className="colgap">
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      defaultValue={["banan"]}
      readOnly
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      error="feilmelding"
      defaultValue={["Eple"]}
      readOnly
    >
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="banan">Banan</Checkbox>
    </CheckboxGroup>
    <hr />
    <Checkbox value="tekst1" readOnly>
      Eple single
    </Checkbox>
    <Checkbox value="tekst1" checked readOnly>
      Banan single
    </Checkbox>
  </div>
);

export const Disabled = () => (
  <div className="colgap">
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      defaultValue={["banan"]}
      disabled
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      error="Feilmelding"
      defaultValue={["Eple"]}
      disabled
    >
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="banan">Banan</Checkbox>
    </CheckboxGroup>
    <hr />
    <Checkbox value="tekst1" disabled>
      Eple single
    </Checkbox>
    <Checkbox value="tekst1" checked disabled>
      Banan single
    </Checkbox>
    <Checkbox value="tekst1" error disabled>
      Pineapple single
    </Checkbox>
    <Checkbox value="tekst1" error checked disabled>
      Peach single
    </Checkbox>
  </div>
);

export const ColorRole = () => (
  <div className="colspan" data-color="brand-magenta">
    <Checkbox value="tekst">Checkboxtekst</Checkbox>
    <Checkbox value="tekst" defaultChecked>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked disabled>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked readOnly>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" error>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked error>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" disabled error>
      Checkboxtekst
    </Checkbox>
    <CheckboxGroup legend="Hvilken frukt liker du?" error="Feilmelding">
      <Checkbox value="tekst" defaultChecked>
        Checkboxtekst
      </Checkbox>
      <Checkbox value="tekst2">Checkboxtekst</Checkbox>
    </CheckboxGroup>
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
        <h2>Single</h2>
        <Single />
      </div>
      <div>
        <h2>SingleSmall</h2>
        <SingleSmall />
      </div>
      <div>
        <h2>SingleDescription</h2>
        <SingleDescription />
      </div>
      <div>
        <h2>Indeterminate</h2>
        <Indeterminate />
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
