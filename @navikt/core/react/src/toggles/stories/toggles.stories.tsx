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
      {["First", "Second", "Third", "Fourth toggle"].map((x) => (
        <Toggles.Button key={x} value={x}>
          {icon ? <Hamburger /> : x}
        </Toggles.Button>
      ))}
    </>
  );

  const [activeValue, setActiveValue] = useState(["First"]);

  return (
    <div>
      <h2>Toggles</h2>
      <Toggles value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggles>
      <h2>Toggles exclusive</h2>
      <Toggles
        exclusive
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggles>
      <h2>Toggles required</h2>
      <Toggles required value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggles>
      <h2>Toggles required exclusive</h2>
      <Toggles
        required
        exclusive
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
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
      <h2>Toggles fullwidth</h2>
      <Toggles
        fullWidth
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggles>
      <h2>Toggles icons fullWidth</h2>
      <Toggles
        fullWidth
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons(true)}
      </Toggles>
      <h2>Toggles Single</h2>
      <Toggles value={activeValue} onChange={(e) => setActiveValue(e)}>
        <Toggles.Button value="First">First</Toggles.Button>
      </Toggles>
      <h2>Toggles Single small</h2>
      <Toggles
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        <Toggles.Button value="First">First</Toggles.Button>
      </Toggles>
      <h2>Toggles Single fullwidth</h2>
      <Toggles
        fullWidth
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        <Toggles.Button value="First">First</Toggles.Button>
      </Toggles>
    </div>
  );
};
