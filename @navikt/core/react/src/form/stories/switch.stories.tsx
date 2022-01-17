import React, { useState } from "react";
import { Switch } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Fieldset } from "../..";
export default {
  title: "ds-react/form/switch",
  component: Switch,
} as Meta;

export const All = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ width: "fit-content" }}>
      <h1>Switch</h1>
      <Switch>Label text</Switch>
      <Switch position="right">Label text</Switch>

      <h2>Switch w/Description</h2>
      <Switch>Label text</Switch>
      <Switch description="Switch description">Label text</Switch>
      <Switch>Label text</Switch>

      <Switch position="right">Label text</Switch>
      <Switch position="right" description="Switch description">
        Label text
      </Switch>
      <Switch position="right">Label text</Switch>

      <h2>hidelabel</h2>
      <Switch description="Switch description" hideLabel>
        Label text
      </Switch>
      <Switch description="Switch description" hideLabel>
        Label text
      </Switch>
      <Switch hideLabel size="small">
        Label text small
      </Switch>
      <Switch position="right" description="Switch description" hideLabel>
        Label text
      </Switch>
      <Switch position="right" description="Switch description" hideLabel>
        Label text
      </Switch>
      <Switch position="right" hideLabel size="small">
        Label text small
      </Switch>

      <h2>Switch small</h2>
      <Switch size="small">Label text</Switch>
      <Switch description="Switch description" size="small">
        Label text
      </Switch>
      <Switch size="small">Label text</Switch>

      <Switch position="right" size="small">
        Label text
      </Switch>
      <Switch position="right" description="Switch description" size="small">
        Label text
      </Switch>
      <Switch position="right" size="small">
        Label text
      </Switch>

      <h2>Controlled</h2>
      <Switch checked={checked} onChange={() => setChecked(!checked)}>
        Label text
      </Switch>

      <h2>Defaultchecked</h2>
      <Switch defaultChecked>Label text</Switch>

      <h2>Disabled</h2>
      <Switch disabled>Label text</Switch>
      <Switch disabled defaultChecked>
        Label text
      </Switch>

      <h2>With fieldset error</h2>
      <Fieldset legend="Fieldset legend" error="Errormsg">
        <Switch defaultChecked>Label text</Switch>
        <Switch>Label text</Switch>
      </Fieldset>

      <h2>loading prop</h2>
      <Switch loading>Label text</Switch>
      <Switch size="small" loading>
        Label text
      </Switch>
      <Switch disabled loading>
        Label text
      </Switch>
    </div>
  );
};
