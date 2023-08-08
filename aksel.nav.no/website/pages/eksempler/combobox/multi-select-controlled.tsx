import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useMemo, useState } from "react";

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

export const Example = () => {
  const [value, setValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const filteredOptions = useMemo(
    () => initialOptions.filter((option) => option.includes(value)),
    [value]
  );

  const onToggleSelected = (option, isSelected) => {
    if (isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
  };

  return (
    <div>
      <UNSAFE_Combobox
        label="Hvilke land har du besøkt de siste 6 ukene? Velg opptil flere."
        filteredOptions={filteredOptions}
        isMultiSelect
        onChange={(event) => setValue(event.target.value)}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        options={initialOptions}
        value={value}
      />
    </div>
  );
};

export default withDsExample(Example, "static");

export const args = {
  index: 1,
  desc: "Du kan overstyre blant annet value, selectedOptions, filteredOptions.",
};
