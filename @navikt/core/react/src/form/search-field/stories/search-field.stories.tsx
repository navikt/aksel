import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { SearchField } from "../index";
import { SearchButton } from "../SearchField";
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
        <SearchField label="Mollit eiusmod">
          <SearchButton size="medium" />
        </SearchField>
        <br />
        <SearchField
          label="Mollit eiusmod"
          description={<div>Ea cupidatat eu sunt commodo</div>}
        >
          <SearchButton size="medium" variant="tertiary" />
        </SearchField>
      </div>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchButton size="small" />
      </SearchField>
      <br />
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
        hideLabel
      >
        <SearchButton size="small" />
      </SearchField>

      <h2>Hidelabel false</h2>
      <SearchField label="Mollit eiusmod" hideLabel={false}>
        <SearchButton size="medium" />
      </SearchField>
      <h2>Controlled state </h2>
      <SearchField
        value={value}
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        onChange={(e) => setValue(e)}
        onClear={() => setValue("")}
      >
        <SearchButton size="medium" />
      </SearchField>
      <h2>No clear button</h2>
      <SearchField
        hideLabel
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        clearButton={false}
      >
        <SearchButton size="medium" />
      </SearchField>
    </div>
  );
};
