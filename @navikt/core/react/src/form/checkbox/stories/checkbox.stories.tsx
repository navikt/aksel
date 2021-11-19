import React from "react";
import { Checkbox, CheckboxGroup } from "../../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/checkbox",
  component: Checkbox,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>Checkboxes</h1>
      <CheckboxGroup legend="Mollit eiusmod">
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>description</h2>
      <CheckboxGroup
        legend="Mollit eiusmod"
        description="Exercitation do labore"
      >
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange" description="Laborum ad">
          Orange
        </Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>error</h2>
      <CheckboxGroup legend="Mollit eiusmod" error="Boks nr 2 må være valgt">
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>error uten errorPropagation</h2>
      <CheckboxGroup
        legend="Mollit eiusmod"
        errorPropagation={false}
        error="Boks nr 2 må være valgt"
      >
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange" error>
          Orange
        </Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>Sizing</h2>
      <CheckboxGroup
        legend="Mollit eiusmod"
        error="Boks nr 2 må være valgt"
        size="small"
      >
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange" error description="desc">
          Orange
        </Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>defaultValue</h2>
      <CheckboxGroup legend="Mollit eiusmod" defaultValue={["Orange", "Melon"]}>
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>hideLenged</h2>
      <CheckboxGroup legend="Mollit eiusmod" hideLegend>
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <h2>hideLabel</h2>
      <CheckboxGroup legend="Mollit eiusmod">
        <Checkbox value="Apple" hideLabel>
          Apple
        </Checkbox>
        <Checkbox value="Orange" hideLabel>
          Orange
        </Checkbox>
        <Checkbox value="Melon" hideLabel>
          Melon
        </Checkbox>
      </CheckboxGroup>
      <h2>Disabled</h2>
      <CheckboxGroup
        legend="Mollit eiusmod"
        disabled
        description="description123"
      >
        <Checkbox value="Apple">
          Apple asd fasd fased flkadsøfasdf klasdøfalsdføl asdlfjasøl
        </Checkbox>
        <Checkbox value="Orange" description="description" checked>
          Orange
        </Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup legend="Mollit eiusmod">
        <Checkbox value="Apple" disabled>
          Apple
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
      </CheckboxGroup>
    </>
  );
};
