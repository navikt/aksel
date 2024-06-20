import { useState } from "react";
import { Chips, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selected, setSelected] = useState(["Nittedal", "Arendal"]);

  return (
    <VStack gap="10">
      <Chips>
        {options.map((option) => (
          <Chips.Toggle
            key={option}
            selected={selected.includes(option)}
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

      <Chips>
        {options.map((option) => (
          <Chips.Toggle
            variant="neutral"
            key={option}
            selected={selected.includes(option)}
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
  "Vennesla",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Toggle chip brukes til filtrering av innhold. Du velger selv om brukeren skal kunne velge én eller flere alternativer om gangen.",
};
