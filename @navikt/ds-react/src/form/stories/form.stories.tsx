import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  const [text, setText] = useState("");

  return (
    <form>
      <TextInput label="Text input" />
      <TextInput label="A disabled text input" disabled />
      <TextInput
        label="Another text input"
        description="Text input description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        error="This text input has an error"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
