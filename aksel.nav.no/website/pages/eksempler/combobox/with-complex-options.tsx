import { useState } from "react";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    options[0].value,
    options[1].value,
  ]);
  return (
    <div>
      <UNSAFE_Combobox
        label="Velg temakoder (opptil 3)"
        options={options.map((o) => ({
          label: `${o.label} [${o.value}]`,
          value: o.value,
        }))}
        isMultiSelect
        maxSelected={{ limit: 3 }}
        selectedOptions={selectedOptions}
        onToggleSelected={(option, isSelected) =>
          isSelected
            ? setSelectedOptions([
                ...selectedOptions,
                options.find((o) => o.value === option).value,
              ])
            : setSelectedOptions(selectedOptions.filter((o) => o !== option))
        }
      />
    </div>
  );
};

const options = [
  { label: "Hjelpemidler", value: "HJE" },
  { label: "Oppfølging", value: "OPP" },
  { label: "Sykepenger", value: "SYK" },
  { label: "Sykemelding", value: "SYM" },
  { label: "Foreldre- og svangerskapspenger", value: "FOR" },
  { label: "Arbeidsavklaringspenger", value: "AAP" },
  { label: "Uføretrygd", value: "UFO" },
  { label: "Pensjon", value: "PEN" },
  { label: "Barnetrygd", value: "BAR" },
  { label: "Kontantstøtte", value: "KON" },
  { label: "Bostøtte", value: "BOS" },
  { label: "Barnebidrag", value: "BBI" },
  { label: "Bidragsforskudd", value: "BIF" },
  { label: "Grunn- og hjelpestønad", value: "GRU" },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Ved å sette en grense for maks antall valgte vil brukeren få opp en beskjed om at hen ikke kan velge flere når grensen er nådd. Resterende valg vil også bli inaktive.",
};
