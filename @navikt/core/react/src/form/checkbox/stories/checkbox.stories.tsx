import React from "react";
import { Checkbox, CheckboxGroup } from "../../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/checkbox",
  component: Checkbox,
} as Meta;

export const All = () => {
  const Checkboxes = (props) => (
    <CheckboxGroup
      legend="Mollit eiusmod"
      description="Exercitation do labore"
      {...props}
    >
      <Checkbox value="Apple">Apple</Checkbox>
      <Checkbox value="Orange" description="Laborum ad">
        Orange
      </Checkbox>
      <Checkbox value="Melon">Melon</Checkbox>
    </CheckboxGroup>
  );

  return (
    <>
      <h1>Checkbox</h1>
      <h2>Single checkbox</h2>
      <Checkbox value="Apple">Apple</Checkbox>
      <h3>Desription</h3>
      <Checkbox value="Apple" description="Laborum ad" defaultChecked>
        Apple
      </Checkbox>
      <h3>Error</h3>
      <Checkbox value="Apple" error>
        Apple
      </Checkbox>
      <Checkbox value="Apple" error defaultChecked>
        Orange
      </Checkbox>
      <h3>Hide label</h3>
      <Checkbox value="Apple" hideLabel description="Laborum ad">
        Apple
      </Checkbox>
      <h3>Disabled</h3>
      <Checkbox value="Apple" disabled>
        Apple
      </Checkbox>
      <Checkbox value="Orange" description="Laborum ad" disabled defaultChecked>
        Orange
      </Checkbox>

      <h2>Checkbox group</h2>
      <Checkboxes />
      <h3>Error</h3>
      <Checkboxes error="Dette er en feilmelding" />
      <h3>Small</h3>
      <Checkboxes size="small" />
      <h3>Small + error</h3>
      <Checkboxes size="small" error="Dette er en feilmelding" />
      <h3>Default value</h3>
      <Checkboxes defaultValue={["Orange", "Melon"]} />
      <h3>Disabled</h3>
      <Checkboxes disabled />
    </>
  );
};
