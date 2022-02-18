import React, { useState } from "react";
import { Attachment, Hamburger, Star, System } from "@navikt/ds-icons";
import { ToggleGroup } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/toggle-group",
  component: ToggleGroup,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Items = (icon?: boolean) => (
  <>
    <ToggleGroup.Item value="first">
      {icon ? <Hamburger /> : "First"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="second">
      {icon ? <Star /> : "Second more txt"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="third">
      {icon ? <Attachment /> : "Third"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="fourth">
      {icon ? <System /> : "Fourth"}
    </ToggleGroup.Item>
  </>
);

export const All = () => {
  const [activeValue, setActiveValue] = useState("first");

  return (
    <div>
      <h2>ToggleGroup</h2>
      <h3>{activeValue}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <ToggleGroup value={activeValue} onChange={setActiveValue}>
          {Items()}
        </ToggleGroup>
        <ToggleGroup value={activeValue} onChange={setActiveValue}>
          {Items(true)}
        </ToggleGroup>
      </div>
      <h2>ToggleGroup Small</h2>
      <h3>{activeValue}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
          {Items()}
        </ToggleGroup>
        <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
          {Items(true)}
        </ToggleGroup>
      </div>
      <h2>ToggleGroup label</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <ToggleGroup
          label="Label msg"
          value={activeValue}
          onChange={setActiveValue}
        >
          {Items()}
        </ToggleGroup>
        <ToggleGroup
          label="Label msg"
          value={activeValue}
          onChange={setActiveValue}
          aria-describedby="demo-id"
        >
          {Items()}
        </ToggleGroup>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h2>Uncontrolled</h2>
        <ToggleGroup onChange={setActiveValue} defaultValue="second">
          {Items()}
        </ToggleGroup>
      </div>
    </div>
  );
};
