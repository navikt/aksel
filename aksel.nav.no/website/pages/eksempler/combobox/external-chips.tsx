import { useState } from "react";
import { Chips, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "bil",
    "tog",
  ]);

  const toggleSelected = (option: string) =>
    selectedOptions.includes(option)
      ? setSelectedOptions(selectedOptions.filter((opt) => opt !== option))
      : setSelectedOptions([...selectedOptions, option]);

  return (
    <VStack gap="space-12">
      <UNSAFE_Combobox
        label="Hva er de kuleste transportmidlene?"
        isMultiSelect
        options={options}
        selectedOptions={selectedOptions}
        onToggleSelected={toggleSelected}
        shouldShowSelectedOptions={false}
      />

      {selectedOptions && (
        <Chips>
          {selectedOptions.map((option) => (
            <Chips.Removable
              key={option}
              onClick={() => toggleSelected(option)}
            >
              {option}
            </Chips.Removable>
          ))}
        </Chips>
      )}
    </VStack>
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
  index: 9,
  desc: "Ved å sette `shouldShowSelectedOptions=false` kan du vise valgte alternativer et annet sted. Dette gjøres ofte i løsninger med flere filtre. Dette er også en mulig løsning når alternativene har mye tekst eller du ønsker å vise ekstra informasjon tilknyttet alternativene.",
};
