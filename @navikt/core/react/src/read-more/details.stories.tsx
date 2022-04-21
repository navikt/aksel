import React, { useState } from "react";
import { Details } from ".";

export default {
  title: "ds-react/Details",
  component: Details,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

export const Default = (props) => {
  const [state, setState] = useState(false);

  return (
    <Details
      open={props.controlled ? state : undefined}
      onClick={() => setState((x) => !x)}
      header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
      {...props}
    >
      Command station, this is ST 321. Code Clearance Blue. We're starting our
      approach. Deactivate the security shield.
    </Details>
  );
};

Default.args = {
  controlled: false,
  size: "medium",
};

export const Small = () => (
  <Details
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    size="small"
  >
    Command station, this is ST 321. Code Clearance Blue. We're starting our
    approach. Deactivate the security shield.
  </Details>
);

export const Open = () => (
  <Details
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    defaultOpen
  >
    Command station, this is ST 321. Code Clearance Blue. We're starting our
    approach. Deactivate the security shield.
  </Details>
);
