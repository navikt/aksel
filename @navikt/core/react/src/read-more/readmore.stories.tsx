import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { ReadMore } from ".";

const meta: Meta<typeof ReadMore> = {
  title: "ds-react/ReadMore",
  component: ReadMore,
};
export default meta;

export const Default: StoryFn<{
  controlled: boolean;
  size: "medium" | "small";
}> = (props) => {
  const [state, setState] = useState(false);

  return (
    <ReadMore
      open={props.controlled ? state : undefined}
      onClick={() => setState((x) => !x)}
      header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
      size={props.size}
    >
      <div style={{ maxWidth: 300 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
        tempore corporis exercitationem minus dignissimos eius aspernatur fugiat
        iusto.
      </div>
    </ReadMore>
  );
};
Default.args = {
  controlled: false,
  size: "medium",
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: { type: "radio" },
  },
};

export const Small = () => (
  <ReadMore
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    size="small"
  >
    Command station, this is ST 321. Code Clearance Blue. We&apos;re starting
    our approach. Deactivate the security shield.
  </ReadMore>
);

export const Open = () => (
  <ReadMore
    header="Grunnen til at vi spør om dette og i tillegg ber om vedlegg"
    defaultOpen
  >
    Command station, this is ST 321. Code Clearance Blue. We&apos;re starting
    our approach. Deactivate the security shield.
  </ReadMore>
);
