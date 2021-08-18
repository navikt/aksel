import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Search } from "@navikt/ds-icons";
import { SearchField, SearchFieldInput, SearchFieldButton } from "../index";
import { Fieldset } from "../..";
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
        <SearchFieldButton>
          <Search /> <span>Søk</span>
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldButton>
          <Search /> <span>Søk</span>
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="s"
      >
        <SearchFieldButton>
          <Search />
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="s"
      >
        <SearchFieldInput />
        <SearchFieldButton>
          <Search />
        </SearchFieldButton>
      </SearchField>

      <h2>SearchField w error</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchFieldInput />
        <SearchFieldButton>
          <Search /> <span>Søk</span>
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchFieldButton>
          <Search /> <span>Søk</span>
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <h2>SearchField in Fieldset</h2>
      <Fieldset legend="Filter" error="Fieldset-error-msg">
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          error="Errormsg"
          hideLabel
        >
          <SearchFieldInput />
          <SearchFieldButton>
            <Search /> <span>Søk</span>
          </SearchFieldButton>
        </SearchField>
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
        >
          <SearchFieldButton>
            <Search /> <span>Søk</span>
          </SearchFieldButton>
          <SearchFieldInput />
        </SearchField>
      </Fieldset>
    </>
  );
};
