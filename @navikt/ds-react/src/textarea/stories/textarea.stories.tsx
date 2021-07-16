import React, { useState } from "react";
import { Textarea } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/textarea",
  component: Textarea,
} as Meta;

export const All = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Textarea value={value} onChange={handleChange} />
      <br />
      <Textarea
        size="s"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <br />
      <Textarea
        label="Label for input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <br />
      <Textarea
        label="Label for input"
        description="description for label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <br />
      <Textarea
        label="Label for input"
        description="description for label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <Textarea
        label="Label for input"
        description="description for label"
        error="Error message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <Textarea
        size="s"
        label="Label for input"
        description="description for label"
        error="Error message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <Textarea
        label="Label for input"
        description="description for label"
        error="Error message"
        errorId="Custom error id"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
