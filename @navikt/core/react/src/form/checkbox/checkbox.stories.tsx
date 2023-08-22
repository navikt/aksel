/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "../../index";

export default {
  title: "ds-react/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxGroup,
  },
  argTypes: {
    size: { control: { type: "select", options: ["medium", "small"] } },
  },
} as Meta;

export const Default = {
  render: (props) => {
    const [state, setState] = useState(["checkbox1"]);

    return (
      <div>
        <CheckboxGroup
          legend={props.legend}
          description={props.description}
          value={props.controlled ? state : undefined}
          onChange={props.controlled ? setState : undefined}
          hideLegend={props.hideLegend}
          error={
            props.errorGroup ? "Errormelding for checkboxgruppe" : undefined
          }
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
  },

  args: {
    controlled: false,
    legend: "Legend-tekst",
    checkboxDescription: false,
    hideLabel: false,
    hideLegend: false,
    errorSingle: false,
    errorGroup: false,
    children: "",
    description: "",
  },
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

export const SingleDescription = () => (
  <div className="colspan">
    <Checkbox value="tekst" description="checkboxdescription">
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked description="checkboxdescription">
      Checkboxtekst
    </Checkbox>
  </div>
);

export const SingleError = () => (
  <div className="colspan">
    <Checkbox value="tekst" error>
      Checkboxtekst
    </Checkbox>
    <Checkbox value="tekst" defaultChecked error>
      Checkboxtekst
    </Checkbox>
  </div>
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

export const DifferentBackgroundDemo = () => {
  const [checked, setChecked] = useState([true, false, false]);

  const toggleChecked = (index) => {
    setChecked((checked) =>
      checked.map((value, i) => (i === index ? !value : value))
    );
  };
  return (
    <div className="colgap">
      <CheckboxGroup
        legend="Hvem vant Rumpeldunkserien i første året til Harry Potter?"
        defaultValue={["3"]}
      >
        <Checkbox value="1">Griffing</Checkbox>
        <Checkbox value="2">Smygard</Checkbox>
        <Checkbox value="3">Håsblås</Checkbox>
        <Checkbox value="4">Ravnklo</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Hvilke frukter vil du ha?"
        defaultValue={["eple"]}
        className="bg-blue-100"
        style={{ backgroundColor: "grey" }}
      >
        <Checkbox value="eple">Eple</Checkbox>
        <Checkbox value="druer">Druer</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Når har du ferie?"
        defaultValue={["1"]}
        style={{ backgroundColor: "lightblue" }}
      >
        <Checkbox value="1">August</Checkbox>
        <Checkbox value="2">Juli</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Alt er feil"
        error="Du gjør alt feil"
        style={{ backgroundColor: "lightblue" }}
      >
        <Checkbox value="1">Feil</Checkbox>
        <Checkbox value="2">Feil</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Du får ikke endre denne"
        readOnly
        defaultValue={["1"]}
        style={{ backgroundColor: "lightgray" }}
      >
        <Checkbox value="1">Ikke</Checkbox>
        <Checkbox value="2">Prøv</Checkbox>
      </CheckboxGroup>
      <span className="bg-blue-100">Faux checkbox group</span>
      <CheckboxGroup legend="Hvilke filtre vil du bruke?">
        <Checkbox
          checked={checked[0] && checked[1] && checked[2]}
          indeterminate={new Set(checked).size === 2} // if both false and true are present
          onChange={(e) =>
            setChecked([e.target.checked, e.target.checked, e.target.checked])
          }
        >
          Alle
        </Checkbox>
        <div style={{ paddingLeft: "2rem" }}>
          <Checkbox checked={checked[0]} onChange={() => toggleChecked(0)}>
            Filter 1
          </Checkbox>
          <Checkbox checked={checked[1]} onChange={() => toggleChecked(1)}>
            Filter 2
          </Checkbox>
          <Checkbox checked={checked[2]} onChange={() => toggleChecked(2)}>
            Filter 3
          </Checkbox>
        </div>
      </CheckboxGroup>
    </div>
  );
};
