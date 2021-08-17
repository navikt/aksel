import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { SearchField, SearchFieldInput } from "../index";
export default {
  title: "ds-react/form/search-field",
  component: SearchField,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>SearchField</h1>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldInput />
      </SearchField>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="s"
      >
        <SearchFieldInput />
      </SearchField>

      <h2>SearchField w error</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchFieldInput />
      </SearchField>
    </>
  );
};
