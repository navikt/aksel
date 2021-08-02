import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { RadioGroup, Radio } from "..";
export default {
  title: "ds-react/form/radio",
  component: RadioGroup,
} as Meta;

export const All = () => {
  const [selected, setSelected] = useState<string>("orange");

  return (
    <form>
      <RadioGroup legend="Radio group label">
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" required>
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" disabled>
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" defaultValue="apple">
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup
        legend="Radio group label"
        value={selected}
        onChange={setSelected}
      >
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <button>Submit</button>
      <RadioGroup legend="Radio group label" error="Error message...">
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
    </form>
  );
};
