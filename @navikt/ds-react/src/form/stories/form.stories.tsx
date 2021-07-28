import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput, Select } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  return (
    <form>
      <input type="text" size={3} />
      <TextInput label="Text input" size="s" />

      <select size={2}>
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </select>
      <Select size="s">
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </Select>
    </form>
  );
};

/*
const [text, setText] = useState("");

<TextInput label="A disabled text input" disabled />
<TextInput
label="Another text input"
description="Text input description"
value={text}
onChange={(e) => setText(e.target.value)}
error="This text input has an error"
/>
<button type="submit">Submit</button>
*/
