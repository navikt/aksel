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
    <SearchField
      size={size}
      label="Mollit eiusmod"
      description="Ea cupidatat eu sunt commodo"
    >
      <SearchFieldInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchFieldClearButton onClick={() => setValue("")}>
        <Close />
        Tøm
      </SearchFieldClearButton>
      <SearchFieldButton>
        <Search /> Søk
      </SearchFieldButton>
    </SearchField>
  );
};
