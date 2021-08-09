import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { RadioGroup, Radio } from "..";
export default {
  title: "ds-react/form/radio",
  component: RadioGroup,
} as Meta;

export const All = () => {
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
      <RadioGroup
        size="s"
        legend="Radio group label"
        description="radio description"
        error="errormsg"
      >
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" disabled>
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" defaultValue="apple">
        <Radio value="apple" disabled>
          Apple
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" error="Error message...">
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
        <Radio disabled value="orange">
          Orange
        </Radio>
      </RadioGroup>
      <RadioGroup disabled legend="Radio group label" error="Error message...">
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" error="Error message...">
        <Radio value="apple">Apple</Radio>
        <Radio error="radio-spesific errormsg" value="orange">
          Orange
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup legend="Radio group label" error="Error message...">
        <Radio value="apple">Apple</Radio>
        <Radio
          description="Radio description"
          error="radio-spesific errormsg"
          value="orange"
        >
          Orange
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup
        errorPropagation={false}
        legend="Radio group label"
        description="Radio with description"
        error="Error message..."
      >
        <Radio value="apple">Apple</Radio>
        <Radio error="radio-spesific errormsg" value="orange">
          Orange
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <RadioGroup
        errorPropagation={false}
        legend="Radio group label"
        description="Radio with description"
        error="Error message..."
      >
        <Radio description="Radio description for input" value="apple">
          Apple
        </Radio>
        <Radio error="radio-spesific errormsg" value="orange">
          Orange
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <h2>size s</h2>
      <RadioGroup
        legend="Radio group label"
        description="Radio with description"
        error="Error message..."
        size="s"
      >
        <Radio description="Radio description for input" value="apple">
          Apple
        </Radio>
        <Radio error="radio-spesific errormsg" value="orange">
          Orange
        </Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
    </form>
  );
};
