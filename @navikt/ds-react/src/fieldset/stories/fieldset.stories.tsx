import React, { useState } from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Checkbox } from "../../index";
export default {
  title: "ds-react/form/fieldset",
  component: Fieldset,
} as Meta;

const FormElements = () => (
  <>
    <div>
      <label>input 1 label</label>
      <input />
    </div>
    <div>
      <input type="checkbox" />
      <label>box 1</label>
    </div>
    <div>
      <input type="checkbox" />
      <label>box 2</label>
    </div>
    <div>
      <input type="checkbox" />
      <label>box 3</label>
    </div>
  </>
);

export const All = () => {
  const [error, setError] = useState(null);
  const [desc, setDesc] = useState("");

  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset legend="This is the legend">
        <FormElements />
      </Fieldset>
      <h1>Fieldset w/description</h1>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
      >
        <FormElements />
      </Fieldset>
      <h1>Fieldset w/error</h1>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        error={error}
        errorId="123ID"
      >
        <FormElements />
      </Fieldset>
      <button onClick={() => setError(error ? null : "New error!")}>
        Toggle error
      </button>
      <Fieldset
        legend="This is the legend"
        description={desc}
        error="this is an error"
      >
        <FormElements />
      </Fieldset>
      <input onChange={(e) => setDesc(e.target.value)} />
    </div>
  );
};

export const FieldsetMedKomponenter = () => {
  return (
    <div>
      <Fieldset
        legend="Hvor vil du sitte?"
        description="Velg hvilken seksjon i flyet du vil sitte"
      >
        <Checkbox label="Fremst" />
        <Checkbox label="Midtseksjon" />
        <Checkbox label="Bakerst" />
        <Checkbox label="Ved nødutgang" />
      </Fieldset>
      <br />
      <Fieldset
        size="s"
        legend="Hvor vil du sitte?"
        description="Velg hvilken seksjon i flyet du vil sitte"
      >
        <Checkbox label="Fremst" />
        <Checkbox label="Midtseksjon" />
        <Checkbox label="Bakerst" />
        <Checkbox label="Ved nødutgang" />
      </Fieldset>
    </div>
  );
};
