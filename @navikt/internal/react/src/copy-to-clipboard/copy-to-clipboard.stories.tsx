import { Meta } from "@storybook/react";
import * as React from "react";
import { LinkIcon } from "@navikt/aksel-icons";

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
    iconPosition: {
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

export const Default = {
  render: (props) => {
    return (
      <CopyToClipboard
        popoverText={props.popoverText}
        copyText={props?.copyText}
        iconPosition={props?.iconPosition}
        size={props?.size}
        popoverPlacement={props?.popoverPlacement}
      >
        {props.text}
      </CopyToClipboard>
    );
  },

  args: {
    popoverText: "Kopierte PI til clipboard",
    copyText: "3.14",
  },
};

export const WithText = () => (
  <CopyToClipboard popoverText="Kopierte PI til clipboard" copyText="3.14">
    Kopier Pi
  </CopyToClipboard>
);

export const IconPlacement = () => (
  <div className="colgap">
    <CopyToClipboard
      iconPosition="right"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
    >
      Right
    </CopyToClipboard>
    <CopyToClipboard
      iconPosition="left"
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
      iconPosition="right"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
      size="small"
    />
    <CopyToClipboard
      iconPosition="left"
      popoverText="Kopierte PI til clipboard"
      copyText="3.14"
      size="small"
    >
      Kopier Pi
    </CopyToClipboard>
  </div>
);

export const Ikon = () => (
  <div className="rowgap">
    <CopyToClipboard
      iconPosition="right"
      popoverText="Kopierte lenke"
      copyText="3.14"
      icon={<LinkIcon />}
    />
    <CopyToClipboard
      iconPosition="left"
      popoverText="Kopierte lenke"
      copyText="3.14"
      icon={<LinkIcon />}
    >
      Kopier lenke
    </CopyToClipboard>
  </div>
);
