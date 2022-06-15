import { Meta } from "@storybook/react";
import * as React from "react";

import { CopyToClipboard } from "../index";

export default {
  title: "ds-react-internal/CopyToClipboard",
  component: CopyToClipboard,
  argTypes: {
    text: {
      control: {
        type: "text",
      },
    },
    popoverPlacement: {
      control: {
        type: "text",
      },
    },
    iconPlacement: {
      control: {
        type: "radio",
        options: ["right", "left"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
} as Meta;

export const Default = (props) => {
  return (
    <CopyToClipboard
      popoverText={props.popoverText}
      copyText={props?.copyText}
      iconPlacement={props?.iconPlacement}
      size={props?.size}
      popoverPlacement={props?.popoverPlacement}
    >
      {props.text}
    </CopyToClipboard>
  );
};

Default.args = {
  popoverText: "Kopierte PI til clipboard",
  copyText: "3.14",
};

export const WithText = () => (
  <CopyToClipboard popoverText="Kopierte PI til clipboard" copyText="3.14">
    Kopier Pi
  </CopyToClipboard>
);

export const IconPlacement = () => (
  <div className="colgap">
    <CopyToClipboard
      iconPlacement="right"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
    >
      Right
    </CopyToClipboard>
    <CopyToClipboard
      iconPlacement="left"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
    >
      Left
    </CopyToClipboard>
  </div>
);

export const Small = () => (
  <div className="rowgap">
    <CopyToClipboard
      iconPlacement="right"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
      size="small"
    />
    <CopyToClipboard
      iconPlacement="left"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
      size="small"
    >
      Kopier Pi
    </CopyToClipboard>
  </div>
);
