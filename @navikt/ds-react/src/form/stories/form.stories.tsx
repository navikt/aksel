import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput, Select } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  const [text, setText] = useState("");

  return (
    <form>
      <TextInput label="Text small input" size="s" />
      <TextInput label="A disabled text input" disabled />
      <TextInput
        label="Another text input"
        description="Text input description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        error="This text input has an error"
      />

      <Select label="Select" error="Select error message">
        <option hidden value="">
          Select an option
        </option>
        <optgroup label="Group 1">
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </optgroup>
        <optgroup label="Group 2">
          <option>four</option>
          <option>five</option>
          <option>six</option>
        </optgroup>
      </Select>
      <Select
        label="Small select"
        description="Such a small select. wow."
        disabled
        size="s"
      >
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </Select>

      <button type="submit">Submit</button>
    </form>
  );
};

/*
 */
