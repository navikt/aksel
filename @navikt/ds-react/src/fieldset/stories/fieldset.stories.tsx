import React, { useState } from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/fieldset",
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

  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset legend="This is the legend">
        <FormElements />
      </Fieldset>
      <h1>Fieldset w/description</h1>
      <Fieldset legend="This is the legend" caption="This is the description">
        <FormElements />
      </Fieldset>
      <h1>Fieldset w/error</h1>
      <Fieldset
        legend="This is the legend"
        caption="This is the description"
        error={error}
        errorId="123ID"
      >
        <FormElements />
      </Fieldset>
      <button onClick={() => setError(error ? null : "New error!")}>
        Toggle error
      </button>
    </div>
  );
};
