import React, { useState } from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Button, Checkbox, CheckboxGroup } from "../../index";
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
    <div>
      <h1>Nested-erros + aria-describedby</h1>
      <div>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            !!fieldsetError
              ? setFieldsetError(undefined)
              : setFieldsetError("Fieldset error message");
          }}
        >
          Toggle fieldset-error
        </Button>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            !!groupError
              ? setGroupError(undefined)
              : setGroupError("CheckboxGroup error message");
          }}
        >
          Toggle checkboxgroup-error
        </Button>
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            !!error ? setError(undefined) : setError("Textfield error message");
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
      </div>
      <Fieldset
        errorId="FIELDSET-ERROR"
        legend="Mollit eiusmod"
        error={fieldsetError}
      >
        <CheckboxGroup
          errorId="GROUP-ERROR"
          errorPropagation={propagation}
          error={groupError}
          legend="checkboxgroup"
          hideLegend
        >
          <Checkbox>Checkbox nr 1</Checkbox>
          <Checkbox errorId="CHECKBOX-ERROR" error={error}>
            Checkbox nr 2
          </Checkbox>
          <Checkbox>Checkbox nr 3</Checkbox>
        </CheckboxGroup>
      </Fieldset>
    </div>
  );
};
