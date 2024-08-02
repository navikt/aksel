import { useMemo, useState } from "react";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [value, setValue] = useState("");
  const mockPersistUserAddedValues = (option, isSelected) => {
    console.log("custom option", { option, isSelected });
  };

  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions,
  );
  const filteredOptions = useMemo(
    () => initialOptions.filter((option) => option.includes(value)),
    [value],
  );

  const onToggleSelected = (
    option: string,
    isSelected: boolean,
    isCustomOption: boolean,
  ) => {
    if (isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
    if (isCustomOption) {
      mockPersistUserAddedValues(option, isSelected);
    }
  };

  return (
    <div>
      <UNSAFE_Combobox
        allowNewValues
        label="Hvilke land har du besøkt de siste 6 ukene? Velg opptil flere."
        filteredOptions={filteredOptions}
        isMultiSelect
        onChange={setValue}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        options={initialOptions}
        value={value}
      />
    </div>
  );
};

const initialOptions = [
  "Norge",
  "Sverige",
  "Danmark",
  "Finland",
  "Island",
  "Storbritannia",
  "Tyskland",
  "Frankrike",
  "Spania",
  "Portugal",
  "Italia",
  "Hellas",
  "Kroatia",
  "Tyrkia",
];

const initialSelectedOptions = ["Norge"];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Du kan overstyre blant annet value, selectedOptions, filteredOptions.",
};
