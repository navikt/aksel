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
    <ToggleGroup.Item value={"first"}>
      {icon ? <Hamburger /> : "First"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value={"second"}>
      {icon ? <Star /> : "Second"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value={"thrid"}>
      {icon ? <Attachment /> : "Thrid"}
    </ToggleGroup.Item>
    <ToggleGroup.Item value={"fourth"}>
      {icon ? <System /> : "Fourth"}
    </ToggleGroup.Item>
  </>
);

export const All = () => {
  const [activeValue, setActiveValue] = useState(["First"]);

  return (
    <div>
      <h2>Toggle</h2>
      <ToggleGroup value={activeValue} onChange={(e) => setActiveValue(e)}>
        {Items()}
      </ToggleGroup>
    </div>
  );
};
