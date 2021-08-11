import React, { useState } from "react";
import { Textarea } from "..";
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
    <div style={{ maxWidth: 400 }}>
      <h1>Textarea</h1>

      <Textarea label="In anim elit" value={value} onChange={handleChange} />

      <h2>Description</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        value={value}
        onChange={handleChange}
      />

      <h2>maxLength</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        maxLength={400}
        value={value}
        onChange={handleChange}
      />

      <h2>Errors</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        error="Textarea error"
        maxLength={400}
        value={value}
        onChange={handleChange}
      />

      <h2>Sizing</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        maxLength={400}
        size="s"
        value={value}
        onChange={handleChange}
      />

      <h2>hideLabel</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        maxLength={400}
        hideLabel
        value={value}
        onChange={handleChange}
      />

      <h2>Disabled</h2>

      <Textarea
        label="In anim elit"
        description="Reprehenderit esse proident"
        maxLength={400}
        disabled
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
