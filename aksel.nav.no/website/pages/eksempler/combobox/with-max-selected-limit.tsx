import { useState } from "react";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1],
  ]);
  return (
    <UNSAFE_Combobox
      label="Hva er de kuleste transportmidlene? (Velg opptil 3)"
      options={options}
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
  "bil",
  "buss",
  "tog",
  "skateboard",
  "sykkel",
  "motorsykkel",
  "båt",
  "fly",
  "helikopter",
  "lastebil",
  "van",
  "scooter",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "260px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "Ved å sette en grense for maks antall valg vil brukeren få opp en beskjed om at hen ikke kan velge flere når grensen er nådd. Resterende alternativer blir inaktive.",
};
