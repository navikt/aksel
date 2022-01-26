import React, { useState } from "react";
import { Attachment, Hamburger, Star, System } from "@navikt/ds-icons";
import { Toggle } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/toggle",
  component: Toggle,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const All = () => {
  const Buttons = (icon?: boolean) => (
    <>
      {["First", "Second", "Third", "Fourth toggle"].map((x) => (
        <Toggle.Button key={x} value={x}>
          {icon ? <Hamburger /> : x}
        </Toggle.Button>
      ))}
    </>
  );

  const [activeValue, setActiveValue] = useState(["First"]);

  return (
    <div>
      <h2>Toggle</h2>
      <Toggle value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggle>
      <h2>Toggle exclusive</h2>
      <Toggle exclusive value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggle>
      <h2>Toggle required</h2>
      <Toggle required value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Buttons()}
      </Toggle>
      <h2>Toggle required exclusive</h2>
      <Toggle
        required
        exclusive
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggle>
      <h2>Toggle icons</h2>
      <Toggle value={activeValue} onChange={(e) => setActiveValue(e)}>
        <Toggle.Button value={"First"}>
          <Hamburger />
        </Toggle.Button>
        <Toggle.Button value={"Second"}>
          <Attachment />
        </Toggle.Button>
        <Toggle.Button value={"Third"}>
          <Star />
        </Toggle.Button>
        <Toggle.Button value={"Fourth toggle"}>
          <System />
        </Toggle.Button>
      </Toggle>
      <br />
      <br />
      <Toggle
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
        fullWidth={false}
      >
        <Toggle.Button value={"First"}>
          <Hamburger />
        </Toggle.Button>
        <Toggle.Button value={"Second"}>
          <Attachment />
        </Toggle.Button>
        <Toggle.Button value={"Third"}>
          <Star />
        </Toggle.Button>
        <Toggle.Button value={"Fourth toggle"}>
          <System />
        </Toggle.Button>
      </Toggle>
      <h2>Toggle small</h2>
      <Toggle
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggle>
      <h2>Toggle icons small</h2>
      <Toggle
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons(true)}
      </Toggle>
      <h2>Toggle fullwidth false</h2>
      <Toggle
        fullWidth={false}
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons()}
      </Toggle>
      <h2>Toggle icons fullWidth false</h2>
      <Toggle
        fullWidth={false}
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        {Buttons(true)}
      </Toggle>
      <h2>Toggle Single</h2>
      <Toggle value={activeValue} onChange={(e) => setActiveValue(e)}>
        <Toggle.Button value="First">First</Toggle.Button>
      </Toggle>
      <h2>Toggle Single small</h2>
      <Toggle
        size="small"
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        <Toggle.Button value="First">First</Toggle.Button>
      </Toggle>
      <h2>Toggle Single fullwidth false</h2>
      <Toggle
        fullWidth={false}
        value={activeValue}
        onChange={(e) => setActiveValue(e)}
      >
        <Toggle.Button value="First">First</Toggle.Button>
      </Toggle>
      <h2>Toggle defaultValues</h2>

      <div>
        <Toggle defaultValue={["First", "Second"]} onChange={(e) => null}>
          {Buttons(false)}
        </Toggle>
      </div>
      <br />
      <div>
        <Toggle defaultValue={["Third"]} onChange={(e) => null}>
          {Buttons(false)}
        </Toggle>
      </div>
    </div>
  );
};
