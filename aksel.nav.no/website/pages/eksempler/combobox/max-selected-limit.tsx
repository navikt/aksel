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
  "Bil",
  "Buss",
  "Tog",
  "Skateboard",
  "Sykkel",
  "Motorsykkel",
  "Båt",
  "Fly",
  "Helikopter",
  "Lastebil",
  "Van",
  "Scooter",
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

export const args: ExampleArgsT = {
  index: 7,
  desc: "`maxSelected` lar deg sette en grense for antall alternativer brukeren kan velge.",
};
