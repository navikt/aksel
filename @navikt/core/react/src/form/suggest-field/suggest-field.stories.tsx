import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { SuggestField } from "../index";
export default {
  title: "ds-react/form/suggest-field",
  component: SuggestField,
} as Meta;

export const All = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 300 }}>
      <h1>SuggestField</h1>
      <SuggestField
        label="Søk alle sider om X og Y"
        onSearch={console.log}
        placeholder="Søk"
      />

      <h2>Inverted</h2>
      <div style={{ background: "black", padding: 16 }}>
        <SuggestField
          inverted
          label="Søk alle sider om X og Y"
          placeholder="Søk"
          onSearch={console.log}
        />
        <SuggestField
          inverted
          label="Søk alle sider om X og Y"
          description="Non incididunt"
          placeholder="Søk"
          onSearch={console.log}
          hideLabel={false}
        />
      </div>
      <h2>Small</h2>
      <SuggestField
        label="Søk alle sider om X og Y"
        size="small"
        onSearch={console.log}
      />

      <h2>Hidelabel false</h2>
      <SuggestField
        label="Søk alle sider om X og Y"
        onSearch={console.log}
        hideLabel={false}
      />
      <h2>Controlled state </h2>
      <SuggestField
        value={value}
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        onChange={(e) => setValue(e)}
        onClear={() => setValue("")}
      />
      <h2>No clear button</h2>
      <SuggestField
        hideLabel
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        clearButton={false}
      />
    </div>
  );
};

export const UUDemo = () => {
  return (
    <SuggestField
      label="Søk alle sider om X og Y"
      onSearch={console.log}
      placeholder="Søk"
    />
  );
};
