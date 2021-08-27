import React from "react";
import { TextField } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/text-field",
  component: TextField,
} as Meta;

export const All = () => {
  return (
    <div style={{ maxWidth: 400 }}>
      <h1>TextField</h1>

      <TextField label="Laborum excepteur" />

      <h2>Description</h2>

      <TextField label="Laborum excepteur" description="Cillum mollit" />

      <h2>Errors</h2>

      <TextField
        label="Laborum excepteur"
        description="Cillum mollit"
        error="TextField error"
      />

      <h2>Sizing</h2>

      <TextField
        size="small"
        label="Laborum excepteur"
        description="Cillum mollit"
        error="TextField error"
      />

      <h2>hideLabel</h2>

      <TextField
        label="Laborum excepteur"
        description="Cillum mollit"
        hideLabel
      />

      <h2>Disabled</h2>

      <TextField
        label="Laborum excepteur"
        description="Cillum mollit"
        disabled
      />
    </div>
  );
};
