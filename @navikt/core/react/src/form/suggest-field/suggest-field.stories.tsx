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
      <SuggestField label="Søk alle sider om X og Y" placeholder="Søk" />

      <h2>Inverted</h2>
      <div
        style={{
          background: "var(--navds-global-color-gray-900)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <SuggestField
          inverted
          label="Søk alle sider om X og Y"
          placeholder="Søk"
        />
        <SuggestField
          inverted
          label="Søk alle sider om X og Y"
          description="Non incididunt"
          placeholder="Søk"
          hideLabel={false}
        />
      </div>
      <h2>Small</h2>
      <SuggestField label="Søk alle sider om X og Y" size="small" />

      <h2>Hidelabel false</h2>
      <SuggestField label="Søk alle sider om X og Y" hideLabel={false} />
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
  return <SuggestField label="Søk alle sider om X og Y" placeholder="Søk" />;
};
