import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Fieldset } from "../..";
import { SearchField } from "../index";
export default {
  title: "ds-react/form/search-field",
  component: SearchField,
} as Meta;

export const All = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <h1>SearchField</h1>
      <div>
        <SearchField label="Mollit eiusmod" />
        <SearchField
          label="Mollit eiusmod"
          description={<div>Ea cupidatat eu sunt commodo</div>}
        />
      </div>

      <h2>Hidelabel</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        hideLabel
      />

      <h2>Inverted</h2>
      <div
        style={{
          width: 300,
          padding: "1rem",
          background: "var(--navds-global-color-gray-900)",
        }}
      >
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
          inverted
        />
        <br />
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
          inverted
          value="Søketekst"
        />
      </div>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      />
      <br />
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
        hideLabel
      />

      <h2>SearchField in Fieldset</h2>
      <Fieldset legend="Filter" error="Fieldset-error-msg">
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
        />
      </Fieldset>

      <h2>Disabled </h2>
      <SearchField
        disabled
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      />
      <h2>Controlled state </h2>
      <SearchField
        value={value}
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        onChange={(e) => setValue(e)}
        onClear={() => setValue("")}
      />
      <h3>Controlled state no clear</h3>
      <SearchField
        value={value}
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        onChange={(e) => setValue(e)}
      />
      <h2>No clear button</h2>
      <SearchField
        hideLabel
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        clearButton={false}
      />
    </>
  );
};
