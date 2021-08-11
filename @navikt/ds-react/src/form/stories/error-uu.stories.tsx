import React, { useState } from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Button, Checkbox, CheckboxGroup, TextField } from "../../index";
export default {
  title: "ds-react/form/uu-demo",
  component: Fieldset,
} as Meta;

export const Demo1 = () => {
  const [error, setError] = useState("");
  const [fieldsetError, setFieldsetError] = useState("");
  const [propagation, setPropagation] = useState(true);
  return (
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
        onClick={() => {
          !!error ? setError("") : setError("Textfield error message");
        }}
      >
        Toggle textfield-error
      </Button>
      <Button
        style={{ marginBottom: "2rem" }}
        onClick={() => setPropagation(!propagation)}
      >
        Toggle errorPropagation
      </Button>
      <Fieldset legend="Mollit eiusmod" error={fieldsetError}>
        <CheckboxGroup
          errorPropagation={propagation}
          legend="checkboxgroup"
          hideLegend
        >
          <Checkbox>Checkbox nr 1</Checkbox>
          <Checkbox error={error}>Checkbox nr 2</Checkbox>
          <Checkbox>Checkbox nr 3</Checkbox>
        </CheckboxGroup>
      </Fieldset>
    </div>
  );
};
