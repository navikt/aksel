import React, { useState } from "react";
import { Close, Search } from "@navikt/ds-icons";
import {
  SearchField,
  SearchFieldInput,
  SearchFieldButton,
  SearchFieldClearButton,
} from "../index";

export const Example = ({ size = "medium" }: { size: "medium" | "small" }) => {
  const [value, setValue] = useState("");

  return (
    <SearchField size={size} label="Skriv i søkefeltet for å vise clearbutton">
      <SearchFieldInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!!value && (
        <SearchFieldClearButton onClick={() => setValue("")}>
          <Close />
          Tøm
        </SearchFieldClearButton>
      )}
      <SearchFieldButton>
        <Search /> Søk
      </SearchFieldButton>
    </SearchField>
  );
};
