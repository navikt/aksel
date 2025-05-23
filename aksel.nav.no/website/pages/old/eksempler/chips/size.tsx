import { useState } from "react";
import { Chips, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selected, setSelected] = useState(["Arendal", "Nittedal"]);
  const [filter, setFilter] = useState(options);

  return (
    <VStack gap="14">
      <VStack gap="5">
        <Chips size="medium">
          {options.map((option) => (
            <Chips.Toggle
              selected={selected.includes(option)}
              key={option}
              onClick={() =>
                setSelected(
                  selected.includes(option)
                    ? selected.filter((x) => x !== option)
                    : [...selected, option],
                )
              }
            >
              {option}
            </Chips.Toggle>
          ))}
        </Chips>
        <Chips size="medium">
          {filter.map((option) => (
            <Chips.Removable
              key={option}
              onClick={() =>
                setFilter((x) =>
                  x.length === 1 ? options : x.filter((y) => y !== option),
                )
              }
            >
              {option}
            </Chips.Removable>
          ))}
        </Chips>
      </VStack>

      <VStack gap="5">
        <Chips size="small">
          {options.map((option) => (
            <Chips.Toggle
              selected={selected.includes(option)}
              key={option}
              onClick={() =>
                setSelected(
                  selected.includes(option)
                    ? selected.filter((x) => x !== option)
                    : [...selected, option],
                )
              }
            >
              {option}
            </Chips.Toggle>
          ))}
        </Chips>
        <Chips size="small">
          {filter.map((option) => (
            <Chips.Removable
              key={option}
              onClick={() =>
                setFilter((x) =>
                  x.length === 1 ? options : x.filter((y) => y !== option),
                )
              }
            >
              {option}
            </Chips.Removable>
          ))}
        </Chips>
      </VStack>
    </VStack>
  );
};

const options = [
  "Lillehammer",
  "Nittedal",
  "Enebakk",
  "Hamar",
  "Skedsmo",
  "Arendal",
  "Gjøvik",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
