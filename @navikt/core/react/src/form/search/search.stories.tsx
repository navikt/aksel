import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Search from "./Search";

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
      },
      options: ["medium", "small"],
    },
    variant: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "simple"],
    },
    error: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Search>;

type Story = StoryObj<typeof Search>;

export const Default = (props) => {
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
        onSearchClick={console.log}
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

export const Disabled = () => (
  <div className="rowgap">
    <div className="colgap">
      <Search disabled label="Søk" />
      <Search disabled label="Søk" variant="secondary" />
      <Search disabled label="Søk" variant="simple" />
    </div>
    <div className="colgap">
      <Search disabled error="errormsg" label="Søk" />
      <Search disabled error="errormsg" label="Søk" variant="secondary" />
      <Search disabled error="errormsg" label="Søk" variant="simple" />
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

export const HtmlSize = () => (
  <div className="colgap">
    <Search
      label="Lorem ipsum dolor sit amet"
      description="Saepe laborum delectus officia perferendis quaerat excepturi possimus hic enim dicta assumenda."
      hideLabel={false}
      htmlSize="20"
    />
    <Search
      label="Lorem ipsum dolor sit amet"
      description="Saepe laborum delectus officia perferendis quaerat excepturi possimus hic enim dicta assumenda."
      hideLabel={false}
      htmlSize="20"
      variant="secondary"
    />
    <Search
      label="Lorem ipsum dolor sit amet"
      description="Saepe laborum delectus officia perferendis quaerat excepturi possimus hic enim dicta assumenda."
      hideLabel={false}
      htmlSize="20"
      variant="simple"
    />
  </div>
);

export const ColorRole = () => (
  <div className="colgap" data-color="brand-magenta">
    <div className="colgap">
      <Search label="Søk" />
      <Search label="Søk" variant="secondary" />
      <Search label="Søk" variant="simple" />
    </div>
    <div>
      <ErrorVariants />
    </div>
  </div>
);

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Default</h2>
        <Default {...props} />
      </div>
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>Variants</h2>
        <Variants />
      </div>
      <div>
        <h2>ErrorVariants</h2>
        <ErrorVariants />
      </div>
      <div>
        <h2>Disabled</h2>
        <Disabled />
      </div>
      <div>
        <h2>Placeholder</h2>
        <Placeholder />
      </div>
      <div>
        <h2>Text</h2>
        <Text />
      </div>
      <div>
        <h2>WLabel</h2>
        <WLabel />
      </div>
      <div>
        <h2>NoClearButton</h2>
        <NoClearButton />
      </div>
      <div>
        <h2>HtmlSize</h2>
        <HtmlSize />
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
