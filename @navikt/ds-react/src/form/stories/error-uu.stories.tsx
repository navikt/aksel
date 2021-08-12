import React, { useState } from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Button, Checkbox, CheckboxGroup, TextField } from "../../index";
import { SSRProvider } from "../../util";
export default {
  title: "ds-react/form/uu-demo",
  component: Fieldset,
} as Meta;

export const Demo1 = () => {
  const [error, setError] = useState(undefined);
  const [fieldsetError, setFieldsetError] = useState(undefined);
  const [groupError, setGroupError] = useState(undefined);
  const [propagation, setPropagation] = useState(true);
  return (
    <SSRProvider>
      <div>
        <h1>Nested-erros + aria-describedby</h1>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            !!fieldsetError
              ? setFieldsetError("")
              : setFieldsetError("Fieldset error message");
          }}
        >
          Toggle fieldset-error
        </Button>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => setGroupError("CheckboxGroup error message")}
        >
          Toggle group-error
        </Button>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            !!error ? setError("") : setError("Checkbox error message");
          }}
        >
          Toggle checkbox-error
        </Button>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => setPropagation(!propagation)}
        >
          Toggle errorPropagation
        </Button>
        <Fieldset legend="Mollit eiusmod" error={fieldsetError}>
          <TextField label="testlabel"></TextField>
          <CheckboxGroup
            errorPropagation={propagation}
            error={groupError}
            legend="checkboxgroup"
            hideLegend
          >
            <Checkbox>Checkbox nr 1</Checkbox>
            <Checkbox error={error}>Checkbox nr 2</Checkbox>
            <Checkbox>Checkbox nr 3</Checkbox>
          </CheckboxGroup>
        </Fieldset>
      </div>
    </SSRProvider>
  );
};
