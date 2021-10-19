import React, { useState } from "react";
import { Close, Search } from "@navikt/ds-icons";
import { SearchField } from "../index";

export const Example = ({ size = "medium" }: { size: "medium" | "small" }) => {
  const [value, setValue] = useState("");

  return (
    <SearchField size={size} label="Skriv i søkefeltet for å vise clearbutton">
      <SearchField.Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!!value && (
        <SearchField.Clear onClick={() => setValue("")}>
          <Close />
          Tøm
        </SearchField.Clear>
      )}
      <SearchField.Button>
        <Search /> Søk
      </SearchField.Button>
    </SearchField>
  );
};
