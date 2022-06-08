import React, { useState } from "react";
import { ReadMore } from ".";

export default {
  title: "ds-react/ReadMore",
  component: ReadMore,
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
    <ReadMore
      open={props.controlled ? state : undefined}
      onClick={() => setState((x) => !x)}
      header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
      {...props}
    >
      Command station, this is ST 321. Code Clearance Blue. We're starting our
      approach. Deactivate the security shield.
    </ReadMore>
  );
};

Default.args = {
  controlled: false,
  size: "medium",
};

export const Small = () => (
  <ReadMore
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    size="small"
  >
    Command station, this is ST 321. Code Clearance Blue. We're starting our
    approach. Deactivate the security shield.
  </ReadMore>
);

export const Open = () => (
  <ReadMore
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    defaultOpen
  >
    Command station, this is ST 321. Code Clearance Blue. We're starting our
    approach. Deactivate the security shield.
  </ReadMore>
);
