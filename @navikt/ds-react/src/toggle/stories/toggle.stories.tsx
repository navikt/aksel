import React, { useState } from "react";
import { ToggleGroup, ToggleButton } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/toggle",
  component: ToggleButton,
} as Meta;

export const All = () => {
  const [singleValue, setSingleValue] = useState(["button1"]);
  const [multipleValue, setMultipleValue] = useState(() => [
    "button1",
    "button2",
  ]);

  const [buttonState, setButtonState] = useState(false);
  return (
    <div>
      <h1>ToggleGroup</h1>
      <ToggleGroup
        active={singleValue}
        onToggleChange={(value) => setSingleValue(value)}
      >
        <ToggleButton value="button1">Knapp1</ToggleButton>
        <ToggleButton value="button2">Knapp2</ToggleButton>
        <ToggleButton value="button3">Knapp3</ToggleButton>
      </ToggleGroup>
      <h1>ToggleGroup mutiple active</h1>
      <ToggleGroup
        active={multipleValue}
        onToggleChange={(value) => setMultipleValue(value)}
        multiple
      >
        <ToggleButton value="button1">Knapp1</ToggleButton>
        <ToggleButton value="button2">Knapp2</ToggleButton>
        <ToggleButton value="button3">Knapp3</ToggleButton>
      </ToggleGroup>
      <h1>ToggleGroup no states</h1>
      <ToggleGroup onToggleChange={() => null}>
        <ToggleButton value="button1">Knapp1</ToggleButton>
        <ToggleButton value="button2">Knapp2</ToggleButton>
        <ToggleButton value="button3">Knapp3</ToggleButton>
      </ToggleGroup>
      <h1>ToggleButton</h1>
      <ToggleButton
        value="button1"
        active={buttonState}
        onClick={() => setButtonState(!buttonState)}
      >
        Knapp1
      </ToggleButton>
      <h1>ToggleButton no active</h1>
      <ToggleButton value="button1" active={buttonState} onClick={() => null}>
        Knapp1
      </ToggleButton>
    </div>
  );
};
