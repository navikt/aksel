import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Search } from "../index";
export default {
  title: "ds-react/form/search",
  component: Search,
  argTypes: {
    clearButton: {
      control: {
        type: "boolean",
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    variant: {
      control: {
        type: "radio",
        options: ["primary", "secondary", "simple"],
      },
    },
  },
} as Meta;

export const Default = (props) => {
  const [state, setState] = useState("");
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      <Search
        value={props.controlled ? state : undefined}
        onChange={props.controlled ? setState : null}
        onSearch={(v) => console.log({ onSearch: v })}
        label="Søk"
        size={props.size}
        clearButton={props.clearButton}
        variant={props.variant}
        hideLabel={props.hideLabel}
      />
    </div>
  );
};

Default.args = {
  controlled: false,
  darkmode: false,
  hideLabel: true,
};

export const Small = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search label="Søk" size="small" />
      <Search label="Søk" variant="secondary" size="small" />
      <Search label="Søk" variant="simple" size="small" />
    </div>
    <div className="colgap" data-theme="dark">
      <Search label="Søk" size="small" />
      <Search label="Søk" variant="secondary" size="small" />
      <Search label="Søk" variant="simple" size="small" />
    </div>
  </div>
);

export const Variants = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search label="Søk" />
      <Search label="Søk" variant="secondary" />
      <Search label="Søk" variant="simple" />
    </div>
    <div className="colgap" data-theme="dark">
      <Search label="Søk" />
      <Search label="Søk" variant="secondary" />
      <Search label="Søk" variant="simple" />
    </div>
  </div>
);

export const Placeholder = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search label="Søk" placeholder="Søk" />
    </div>
    <div className="colgap" data-theme="dark">
      <Search label="Søk" placeholder="Søk" />
    </div>
  </div>
);

export const Text = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search label="Søk" value="Søketekst" />
      <Search label="Søk" variant="secondary" value="Søketekst" />
      <Search label="Søk" variant="simple" value="Søketekst" />
    </div>
    <div className="colgap" data-theme="dark">
      <Search label="Søk" value="Søketekst" />
      <Search label="Søk" variant="secondary" value="Søketekst" />
      <Search label="Søk" variant="simple" value="Søketekst" />
    </div>
  </div>
);

export const WLabel = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search label="Label søk" variant="simple" hideLabel={false} />
      <Search
        label="Label søk"
        description="Description søk"
        variant="simple"
        hideLabel={false}
      />
    </div>
    <div className="colgap" data-theme="dark">
      <Search label="Label søk" variant="simple" hideLabel={false} />
      <Search
        label="Label søk"
        description="Description søk"
        variant="simple"
        hideLabel={false}
      />
    </div>
  </div>
);

export const NoClearButton = () => (
  <div className="colgap">
    <Search label="Label søk" clearButton={false} value="søketekst" />
    <Search
      label="Label søk"
      variant="simple"
      clearButton={false}
      value="søketekst"
    />
  </div>
);
