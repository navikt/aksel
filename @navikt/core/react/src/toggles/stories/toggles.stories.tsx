import React, { useState } from "react";
import { Hamburger } from "@navikt/ds-icons";
import { Toggles } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/toggles",
  component: Toggles,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const All = () => {
  const Buttons = (icon?: boolean) => (
    <>
      {["First", "Second", "Thrid", "Fourth"].map((x) => (
        <Toggles.Button key={Math.random()} value={x}>
          {icon ? <Hamburger /> : x}
        </Toggles.Button>
      ))}
    </>
  );

  const [activeValue, setActiveValue] = useState(["First"]);

  console.log(activeValue);
  return (
    <div>
      <h2>Toggles</h2>
      <Toggles value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggles>
      <h2>Toggles icons</h2>
      <Toggles value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons(true)}
      </Toggles>
      <h2>Toggles small</h2>
      <Toggles
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggles>
      <h2>Toggles icons small</h2>
      <Toggles
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons(true)}
      </Toggles>
    </div>
  );
};
