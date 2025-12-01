import { useState } from "react";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    options[0].value,
    options[1].value,
  ]);
  return (
    <UNSAFE_Combobox
      label="Velg opptil 3 temakoder"
      options={options.map((o) => ({
        label: `${o.label} [${o.value}]`,
        value: o.value,
      }))}
      isMultiSelect
      maxSelected={3}
      selectedOptions={selectedOptions}
      onToggleSelected={(option, isSelected) =>
        isSelected
          ? setSelectedOptions([...selectedOptions, option])
          : setSelectedOptions(selectedOptions.filter((o) => o !== option))
      }
    />
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
export default withDsExample(Example, {
  variant: "static",
  minHeight: "300px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "Ved å sende inn options som objekter er det mulig å vise en brukervennlig tekst til brukeren, samtidig som systemet i bakkant kan forholde seg til en ID.",
};
