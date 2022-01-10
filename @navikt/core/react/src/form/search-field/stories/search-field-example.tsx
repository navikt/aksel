import React, { useState } from "react";
import { Close } from "@navikt/ds-icons";
import { SearchField } from "../index";
import { Fieldset } from "../..";

export const Example = ({ size = "medium" }: { size: "medium" | "small" }) => {
  const [value, setValue] = useState("");

  return (
    <Fieldset legend="a" hideLegend>
      <SearchField
        size={size}
        label="Skriv i søkefeltet for å vise clearbutton"
      >
        <SearchField.Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {!!value && (
          <SearchField.Clear onClick={() => setValue("")}>
            <Close aria-hidden />
          </SearchField.Clear>
        )}
      </SearchField>
    </Fieldset>
  );
};
