import { Meta, StoryFn } from "@storybook/react-vite";
import React, { useState } from "react";
import VStack from "../../layout/stack/VStack";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import Checkbox from "./Checkbox";
import CheckboxGroup, { CheckboxGroupProps } from "./CheckboxGroup";

const meta: Meta<typeof Checkbox> = {
  title: "ds-react/Checkbox",
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

interface Props extends CheckboxGroupProps {
  controlled?: boolean;
  error?: boolean;
  checkboxChildren?: string;
  checkboxDescription?: boolean;
  checkboxError?: boolean;
  checkboxIndeterminate?: boolean;
  checkboxHideLabel?: boolean;
}

export const Default: StoryFn<Props> = (props) => {
  const [state, setState] = useState(["checkbox1"]);

  return (
    <div>
      <CheckboxGroup
        legend={props.legend}
        description={props.description}
        value={props.controlled ? state : undefined}
        onChange={props.controlled ? setState : undefined}
        hideLegend={props.hideLegend}
        error={props.error ? "Errormelding for checkboxgruppe" : undefined}
        size={props.size}
      >
        <Checkbox
          value="checkbox1"
          indeterminate={props.checkboxIndeterminate}
          hideLabel={props.checkboxHideLabel}
        >
          {props.checkboxChildren || "Apple"}
        </Checkbox>
        <Checkbox
          value="checkbox2"
          error={props.checkboxError}
          description={
            props.checkboxDescription
              ? "Quis laborum culpa enim amet cillum veniam."
              : undefined
          }
          indeterminate={props.checkboxIndeterminate}
          hideLabel={props.checkboxHideLabel}
        >
          {props.checkboxChildren || "Orange"}
        </Checkbox>
        <Checkbox
          value="checkbox3"
          indeterminate={props.checkboxIndeterminate}
          hideLabel={props.checkboxHideLabel}
        >
          {props.checkboxChildren || "Banana"}
        </Checkbox>
        <Checkbox
          value="checkbox4"
          indeterminate={props.checkboxIndeterminate}
          hideLabel={props.checkboxHideLabel}
        >
          {props.checkboxChildren || "Melon"}
        </Checkbox>
      </CheckboxGroup>
    </div>
  );
};
Default.args = {
  controlled: false,
  legend: "Legend-tekst",
  hideLegend: false,
  description: "",
  error: false,
  checkboxChildren: "",
  checkboxDescription: false,
  checkboxError: false,
  checkboxIndeterminate: false,
  checkboxHideLabel: false,
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: { type: "radio" },
  },
};

export const Group = () => (
  <VStack gap="space-16">
    <CheckboxGroup legend="Group legend" defaultValue={["tekst2"]}>
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
      <Checkbox value="tekst2">Checkboxtekst</Checkbox>
    </CheckboxGroup>
    <CheckboxGroup legend="Group legend" defaultValue={["tekst2"]} size="small">
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
      <Checkbox value="tekst2">Checkboxtekst</Checkbox>
    </CheckboxGroup>
  </VStack>
);

export const GroupError = () => (
  <VStack gap="space-16">
    <CheckboxGroup
      legend="Group legend"
      defaultValue={["tekst2"]}
      error="Group errormelding"
    >
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
      <Checkbox value="tekst2">Checkboxtekst</Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Group legend"
      defaultValue={["tekst2"]}
      error="Group errormelding"
      size="small"
    >
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
      <Checkbox value="tekst2">Checkboxtekst</Checkbox>
    </CheckboxGroup>
  </VStack>
);

export const GroupDescription = () => (
  <VStack gap="space-16">
    <CheckboxGroup legend="Group legend" description="Group description">
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Group legend"
      description="Group description"
      size="small"
    >
      <Checkbox value="tekst">Checkboxtekst</Checkbox>
    </CheckboxGroup>
  </VStack>
);

export const Single = () => (
  <>
    <Checkbox value="v">Checkboxtekst</Checkbox>
    <Checkbox value="v" size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" defaultChecked>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" defaultChecked size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" description="Beskrivelse">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" description="Beskrivelse" size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" readOnly>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" readOnly size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" checked readOnly>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" checked readOnly size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" error>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" error size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" disabled>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" disabled size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" checked disabled>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" checked disabled size="small">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="v" error disabled>
      Checkboxtekst (error)
    </Checkbox>
    <Checkbox value="v" error disabled size="small">
      Checkboxtekst (error)
    </Checkbox>
    <Checkbox value="v" error checked disabled>
      Checkboxtekst (error)
    </Checkbox>
    <Checkbox value="v" error checked disabled size="small">
      Checkboxtekst (error)
    </Checkbox>
  </>
);

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
      <Checkbox indeterminate description="With description">
        Indeterminate medium
      </Checkbox>
      <Checkbox indeterminate size="small">
        Indeterminate small
      </Checkbox>
      <Checkbox indeterminate size="small" description="With description">
        Indeterminate small
      </Checkbox>
    </>
  );
};

export const Readonly = () => (
  <VStack gap="space-16">
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      defaultValue={["banan"]}
      readOnly
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      error="feilmelding"
      defaultValue={["banan"]}
      readOnly
      size="small"
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
  </VStack>
);

export const Disabled = () => (
  <VStack gap="space-16">
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      defaultValue={["banan"]}
      disabled
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
    <CheckboxGroup
      legend="Hvilken frukt liker du?"
      error="Feilmelding"
      defaultValue={["banan"]}
      disabled
      size="small"
    >
      <Checkbox value="banan">Banan</Checkbox>
      <Checkbox value="eple" description="Epler kommer i 4 varianter">
        Eple
      </Checkbox>
      <Checkbox value="druer" indeterminate>
        Druer
      </Checkbox>
    </CheckboxGroup>
  </VStack>
);

export const ColorRole = () => (
  <div data-color="brand-magenta">
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

export const Chromatic = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Single,
  Indeterminate,
  Readonly,
  Disabled,
  ColorRole,
});

export const ChromaticLight = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Single,
  Indeterminate,
  Readonly,
  Disabled,
  ColorRole,
});
ChromaticLight.globals = { theme: "light", mode: "darkside" };

export const ChromaticDark = renderStoriesForChromatic({
  Group,
  GroupError,
  GroupDescription,
  Single,
  Indeterminate,
  Readonly,
  Disabled,
  ColorRole,
});
ChromaticDark.globals = { theme: "dark", mode: "darkside" };
