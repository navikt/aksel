import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TextField from "./TextField";

export default {
  title: "ds-react/TextField",
  component: TextField,
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small"],
    },
    description: {
      type: "string",
    },
    error: {
      type: "string",
    },
    hideLabel: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default = {
  render: (props) => {
    return <TextField {...props} label="Ipsum enim quis culpa" />;
  },

  args: {},
};

export const Small = () => {
  return <TextField size="small" label="Ipsum enim quis culpa" />;
};

export const Description = () => {
  return (
    <div className="colgap">
      <TextField
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />
      <TextField
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      />
    </div>
  );
};

const EmptyComponent = () => null;

export const EmptyDescription = () => (
  <TextField label="Ipsum enim quis culpa" description={<EmptyComponent />} />
);

export const WithError = () => {
  return (
    <div className="colgap">
      <TextField
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />

      <TextField
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="colgap">
      <TextField label="Ipsum enim quis culpa" disabled />
      <TextField label="Ipsum enim quis culpa" disabled size="small" />
    </div>
  );
};

export const HideLabel = () => {
  return <TextField label="Ipsum enim quis culpa" hideLabel />;
};

export const Readonly = () => {
  return (
    <div className="colgap">
      <TextField
        label="Bosted"
        description="Skriv bosted i Norge"
        readOnly
        value="Oslo"
      />
      <TextField label="Bosted" readOnly error="feilmelding" value="Oslo" />
    </div>
  );
};

export const ScrollMargin = () => {
  return (
    <div style={{ minHeight: "200vh" }}>
      <TextField
        label="Bosted"
        description="Skriv bosted i Norge"
        value="Oslo"
        id="smargin-test"
      />
      <a href="#smargin-test">Test scroll-margin</a>
    </div>
  );
};

export const ColorRole = () => {
  return (
    <div className="colgap" data-color="brand-magenta">
      <Description />
      <WithError />
      <Disabled />
    </div>
  );
};

export const Chromatic: Story = {
  render: () => (
    <div>
      <div>
        <h2>Default</h2>
        {Default?.render({})}
      </div>
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>Description</h2>
        <Description />
      </div>
      <div>
        <h2>EmptyDescription</h2>
        <EmptyDescription />
      </div>
      <div>
        <h2>WithError</h2>
        <WithError />
      </div>
      <div>
        <h2>Disabled</h2>
        <Disabled />
      </div>
      <div>
        <h2>HideLabel</h2>
        <HideLabel />
      </div>
      <div>
        <h2>Readonly</h2>
        <Readonly />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
