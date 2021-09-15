import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Close, Search } from "@navikt/ds-icons";
import {
  SearchField,
  SearchFieldInput,
  SearchFieldButton,
  SearchFieldClearButton,
} from "../index";
import { Fieldset } from "../..";
export default {
  title: "ds-react/form/search-field",
  component: SearchField,
} as Meta;

export const All = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <h1>SearchField</h1>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldInput />
        <SearchFieldButton>
          <Search /> Søk
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldButton>
          <Search /> Søk
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <h1>SearchField w clearsearch</h1>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldInput />
        <SearchFieldClearButton>
          <Close />
        </SearchFieldClearButton>
        <SearchFieldButton onClick={() => setShow(!show)}>
          <Search /> Søk
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchFieldButton>
          <Search /> Søk
        </SearchFieldButton>
        <SearchFieldClearButton>
          <Close /> Tøm
        </SearchFieldClearButton>
        <SearchFieldInput />
      </SearchField>

      <h2>Hidelabel</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        hideLabel
      >
        <SearchFieldButton>
          <Search /> Søk
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchFieldButton>
          <Search />
          <span className="sr-only">Søk</span>
        </SearchFieldButton>
        <SearchFieldInput />
      </SearchField>

      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchFieldInput />
        <SearchFieldButton>
          <Search />
          <span className="sr-only">Søk</span>
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchFieldButton>
          <Search />
          <span className="sr-only">Søk</span>
        </SearchFieldButton>
        <SearchFieldClearButton>
          <Close /> Tøm
        </SearchFieldClearButton>
        <SearchFieldInput />
      </SearchField>

      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchFieldInput />
        <SearchFieldClearButton>
          <Close /> Tøm
        </SearchFieldClearButton>
        <SearchFieldButton>
          <Search />
          <span className="sr-only">Søk</span>
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
          <Search /> Søk
        </SearchFieldButton>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchFieldButton>
          <Search /> Søk
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
            <Search /> Søk
          </SearchFieldButton>
        </SearchField>
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
        >
          <SearchFieldButton>
            <Search /> Søk
          </SearchFieldButton>
          <SearchFieldInput />
        </SearchField>
      </Fieldset>
    </>
  );
};
