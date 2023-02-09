import { Meta } from "@storybook/react";
import React from "react";
import { Switch } from "../index";

export default {
  title: "ds-react/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    position: {
      control: {
        type: "radio",
        options: ["right", "left"],
      },
    },
    description: {
      type: "string",
    },
    hideLabel: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    loading: {
      type: "boolean",
    },
  },
} as Meta;

export const Default = {
  render: (props) => {
    return <Switch {...props}>Label text</Switch>;
  },

  args: {
    position: "right",
  },
};

export const Small = () => {
  return (
    <div className="colgap">
      <Switch size="small">Label text</Switch>
      <Switch size="small" position="right">
        Label text
      </Switch>
    </div>
  );
};

export const Description = () => {
  return (
    <div className="colgap">
      <Switch size="small" description="Cillum sint exercitation ut cillum.">
        Label text
      </Switch>
      <Switch
        size="small"
        position="right"
        description="Cillum sint exercitation ut cillum."
      >
        Label text
      </Switch>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="colgap">
      <div className="colgap">
        <Switch loading>Label text</Switch>

        <Switch checked loading>
          Label text
        </Switch>
      </div>
      <div className="colgap">
        <Switch loading size="small">
          Label text
        </Switch>
        <Switch checked loading size="small">
          Label text
        </Switch>
      </div>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="colgap">
      <Switch disabled>Label text</Switch>

      <Switch checked disabled>
        Label text
      </Switch>
    </div>
  );
};

export const HideLabel = () => {
  return (
    <div className="colgap">
      <Switch hideLabel>Label text</Switch>

      <Switch checked hideLabel>
        Label text
      </Switch>
    </div>
  );
};
