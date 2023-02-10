/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState } from "react";

import { Search } from "../index";
export default {
  title: "ds-react/Search",
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
    error: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

export const Default = {
  render: (props) => {
    const [state, setState] = useState("");
    return (
      <div data-theme={props.darkmode ? "dark" : "light"}>
        <Search
          value={props.controlled ? state : undefined}
          onChange={props.controlled ? setState : undefined}
          label="Søk"
          size={props.size}
          clearButton={props.clearButton}
          variant={props.variant}
          hideLabel={props.hideLabel}
          error={props.error}
        />
      </div>
    );
  },

  args: {
    controlled: false,
    darkmode: false,
    hideLabel: true,
  },
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

export const ErrorVariants = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search error="errormsg" label="Søk" />
      <Search error="errormsg" label="Søk" variant="secondary" />
      <Search error="errormsg" label="Søk" variant="simple" />
    </div>
    <div className="colgap" data-theme="dark">
      <Search error="errormsg" label="Søk" />
      <Search error="errormsg" label="Søk" variant="secondary" />
      <Search error="errormsg" label="Søk" variant="simple" />
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
