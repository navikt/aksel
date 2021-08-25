import React, { useState } from "react";
import { Close, Search } from "@navikt/ds-icons";
import {
  SearchField,
  SearchFieldInput,
  SearchFieldButton,
  SearchFieldClearButton,
} from "../index";

export const Example = () => {
  const [value, setValue] = useState("");

  return (
    <SearchField
      label="Mollit eiusmod"
      description="Ea cupidatat eu sunt commodo"
    >
      <SearchFieldInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchFieldClearButton onClick={() => setValue("")}>
        <Close />
        <span>Tøm</span>
      </SearchFieldClearButton>
      <SearchFieldButton>
        <Search /> <span>Søk</span>
      </SearchFieldButton>
    </SearchField>
  );
};
