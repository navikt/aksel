import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "../../index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/Form/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxGroup,
  },
} as Meta;

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
        error={props.errorGroup ? "Errormelding" : undefined}
        {...props}
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
