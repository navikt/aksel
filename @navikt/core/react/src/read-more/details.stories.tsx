import React, { useState } from "react";
import { Details } from ".";
import { Link } from "..";

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
      header="ReadMore header text"
      {...props}
    >
      Est ex duis proident nostrud elit qui laborum anim minim eu eiusmod.
      Veniam in nostrud sunt tempor velit incididunt sint ex dolor qui velit id
      eu. <Link href="example.com">Deserunt magna sunt velit in</Link>. Est
      exercitation id cillum qui do. Minim adipisicing nostrud commodo proident
      occaecat aliquip nulla anim proident reprehenderit.
    </Details>
  );
};

Default.args = {
  controlled: false,
  size: "medium",
};

export const Small = () => (
  <Details header="ReadMore header text" size="small">
    Est ex duis proident nostrud elit qui laborum anim minim eu eiusmod. Veniam
    in nostrud sunt tempor velit incididunt sint ex dolor qui velit id eu.{" "}
    <Link href="example.com">Deserunt magna sunt velit in</Link>. Est
    exercitation id cillum qui do. Minim adipisicing nostrud commodo proident
    occaecat aliquip nulla anim proident reprehenderit.
  </Details>
);

export const Open = () => (
  <Details header="ReadMore header text" defaultOpen>
    Est ex duis proident nostrud elit qui laborum anim minim eu eiusmod. Veniam
    in nostrud sunt tempor velit incididunt sint ex dolor qui velit id eu.{" "}
    <Link href="example.com">Deserunt magna sunt velit in</Link>. Est
    exercitation id cillum qui do. Minim adipisicing nostrud commodo proident
    occaecat aliquip nulla anim proident reprehenderit.
  </Details>
);
