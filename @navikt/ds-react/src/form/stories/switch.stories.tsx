import React, { useState } from "react";
import { Switch } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/switch",
  component: Switch,
} as Meta;

export const All = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <h1>Switch</h1>
      <Switch>Label text</Switch>

      <h2>Switch w/Description</h2>
      <Switch description="Switch description">Label text</Switch>

      <h2>Switch small</h2>
      <Switch description="Switch description" size="small">
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
    </div>
  );
};
