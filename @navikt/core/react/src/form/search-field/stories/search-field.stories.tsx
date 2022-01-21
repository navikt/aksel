import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Close, Search } from "@navikt/ds-icons";
import { SearchField } from "../index";
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
        description={<div>Ea cupidatat eu sunt commodo</div>}
      >
        <SearchField.Input />
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
        <SearchField.Input />
      </SearchField>

      <h1>SearchField w clearsearch</h1>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchField.Input />
        <SearchField.Clear>
          <Close />
        </SearchField.Clear>
        <SearchField.Button onClick={() => setShow(!show)}>
          <Search /> Søk
        </SearchField.Button>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
        <SearchField.Clear>
          <Close /> Tøm
        </SearchField.Clear>
        <SearchField.Input />
      </SearchField>

      <h2>Hidelabel</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        hideLabel
      >
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
        <SearchField.Input />
      </SearchField>

      <h2>SearchField small</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchField.Button>
          <Search />
          <span className="navds-sr-only">Søk</span>
        </SearchField.Button>
        <SearchField.Input />
      </SearchField>

      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchField.Input />
        <SearchField.Button>
          <Search />
          <span className="navds-sr-only">Søk</span>
        </SearchField.Button>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchField.Button>
          <Search />
          <span className="navds-sr-only">Søk</span>
        </SearchField.Button>
        <SearchField.Clear>
          <Close /> Tøm
        </SearchField.Clear>
        <SearchField.Input />
      </SearchField>

      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        size="small"
      >
        <SearchField.Input />
        <SearchField.Clear>
          <Close /> Tøm
        </SearchField.Clear>
        <SearchField.Button>
          <Search />
          <span className="navds-sr-only">Søk</span>
        </SearchField.Button>
      </SearchField>

      <h2>SearchField w error</h2>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchField.Input />
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
      </SearchField>
      <SearchField
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
        error="Errormsg"
      >
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
        <SearchField.Input />
      </SearchField>

      <h2>SearchField in Fieldset</h2>
      <Fieldset legend="Filter" error="Fieldset-error-msg">
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          error="Errormsg"
          hideLabel
        >
          <SearchField.Input />
          <SearchField.Button>
            <Search /> Søk
          </SearchField.Button>
        </SearchField>
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          hideLabel
        >
          <SearchField.Button>
            <Search /> Søk
          </SearchField.Button>
          <SearchField.Input />
        </SearchField>
      </Fieldset>

      <h2>Disabled </h2>
      <SearchField
        disabled
        label="Mollit eiusmod"
        description="Ea cupidatat eu sunt commodo"
      >
        <SearchField.Input />
        <SearchField.Button>
          <Search /> Søk
        </SearchField.Button>
      </SearchField>
      <Fieldset legend="Filter" disabled>
        <SearchField
          label="Mollit eiusmod"
          description="Ea cupidatat eu sunt commodo"
          error="Errormsg"
        >
          <SearchField.Input />
          <SearchField.Button>
            <Search /> Søk
          </SearchField.Button>
        </SearchField>
      </Fieldset>
    </>
  );
};
