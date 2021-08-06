import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextField, Select } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  const [text, setText] = useState(undefined);

  return (
    <form>
      <TextField
        label="Text small input"
        size="s"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id={text}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

/*
 */
