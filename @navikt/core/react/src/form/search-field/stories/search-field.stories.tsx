import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { SearchField } from "../index";
export default {
  title: "ds-react/form/search-field",
  component: SearchField,
} as Meta;

export const All = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 300 }}>
      <h1>SearchField</h1>
      <div>
        <SearchField label="Mollit eiusmod" onSearch={console.log}>
          <SearchField.Button />
        </SearchField>
        <br />
        <SearchField label="Mollit eiusmod" onSearch={console.log}>
          <SearchField.Button variant="primary" />
        </SearchField>
      </div>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchField.Button />
      </SearchField>
      <br />
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
        hideLabel
      >
        <SearchField.Button variant="primary" />
      </SearchField>

      <h2>Med knappe-tekst</h2>
      <SearchField label="Mollit eiusmod" hideLabel={false}>
        <SearchField.Button>Søk</SearchField.Button>
      </SearchField>
      <SearchField label="Mollit eiusmod" hideLabel={false}>
        <SearchField.Button variant="primary">Søk</SearchField.Button>
      </SearchField>
      <h2>Hidelabel false</h2>
      <SearchField label="Mollit eiusmod" hideLabel={false}>
        <SearchField.Button />
      </SearchField>
      <h2>Controlled state </h2>
      <SearchField
        value={value}
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        onChange={(e) => setValue(e)}
        onClear={() => setValue("")}
      >
        <SearchField.Button />
      </SearchField>
      <h2>No clear button</h2>
      <SearchField
        hideLabel
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        clearButton={false}
      >
        <SearchField.Button />
      </SearchField>
    </div>
  );
};
