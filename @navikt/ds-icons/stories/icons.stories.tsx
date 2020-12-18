import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/react/types-6-0';
import { storiesOf } from "@storybook/react";

import * as Icons from "../src";

const iconsStories = storiesOf("@navikt/icons", module);

Object.entries(Icons).forEach(([name, Icon]) => {
  iconsStories.add(name, () => (
    <div>
      <Icon />
      <Icon style={{ height: "2em", width: "2em" }} />
      <Icon style={{ height: "4em", width: "4em" }} />
      <Icon style={{ height: "4em", width: "4em", color: "white" }} />
      <Icon style={{ height: "4em", width: "4em", color: "crimson" }} />
      <br />
      <Icon style={{ height: "4em", width: "4em", backgroundColor: "#aaa" }} />
      <Icon style={{ height: "4em", width: "4em", backgroundColor: "#777" }} />
      <Icon style={{ height: "4em", width: "4em", backgroundColor: "#333" }} />
      <Icon style={{ height: "4em", width: "4em", backgroundColor: "#000" }} />
      <br />
      <Icon
        style={{ height: "4em", width: "4em", transform: "rotate(45deg)" }}
      />
      <Icon
        style={{ height: "4em", width: "4em", transform: "rotate(90deg)" }}
      />
      <Icon
        style={{ height: "4em", width: "4em", transform: "rotate(180deg)" }}
      />
    </div>
  ));
});
