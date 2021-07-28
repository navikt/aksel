import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput, Select } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  const [text, setText] = useState(undefined);

  return (
    <form>
      <TextInput
        label="Text small input"
        size="s"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id={text}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

/*
 */
