import React from "react";
import { Loader } from "..";
import { Meta } from "@storybook/react";
export default {
  title: "ds-react/Loader",
  component: Loader,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: [
          "3xlarge",
          "2xlarge",
          "xlarge",
          "large",
          "medium",
          "small",
          "xsmall",
        ],
      },
    },
    variant: {
      control: {
        type: "radio",
        options: ["neutral", "interaction", "inverted"],
      },
    },
  },
} as Meta;

export const Default = (props: any) => {
  return <Loader {...props} />;
};

Default.args = {
  transparent: false,
};

export const Size = () => (
  <div>
    <Loader size="3xlarge" />
    <Loader size="2xlarge" />
    <Loader size="xlarge" />
    <Loader size="large" />
    <Loader size="medium" />
    <Loader size="small" />
    <Loader size="xsmall" />
  </div>
);

export const Variant = () => (
  <div className="colgap">
    <div>
      <Loader size="3xlarge" variant="neutral" />
      <Loader size="3xlarge" variant="inverted" />
      <Loader size="3xlarge" variant="interaction" />
    </div>
    <div style={{ backgroundColor: "#262626" }}>
      <Loader size="3xlarge" variant="neutral" />
      <Loader size="3xlarge" variant="inverted" />
      <Loader size="3xlarge" variant="interaction" />
    </div>
  </div>
);

export const Transparent = () => (
  <div className="colgap">
    <div>
      <Loader size="3xlarge" transparent variant="neutral" />
      <Loader size="3xlarge" transparent variant="inverted" />
      <Loader size="3xlarge" transparent variant="interaction" />
    </div>
    <div style={{ backgroundColor: "#262626" }}>
      <Loader size="3xlarge" transparent variant="neutral" />
      <Loader size="3xlarge" transparent variant="inverted" />
      <Loader size="3xlarge" transparent variant="interaction" />
    </div>
  </div>
);
