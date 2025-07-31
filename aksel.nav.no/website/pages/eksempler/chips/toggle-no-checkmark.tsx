import { useState } from "react";
import { Chips, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selected, setSelected] = useState(3);

  return (
    <VStack gap="10">
      <VStack gap="3">
        Variant action (default)
        <Chips>
          {options.map((label, id) => (
            <Chips.Toggle
              checkmark={false}
              key={label}
              selected={selected === id}
              onClick={() => setSelected(id)}
            >
              {label}
            </Chips.Toggle>
          ))}
        </Chips>
      </VStack>
      <VStack gap="3">
        Variant neutral
        <Chips>
          {options.map((label, id) => (
            <Chips.Toggle
              checkmark={false}
              variant="neutral"
              key={label}
              selected={selected === id}
              onClick={() => setSelected(id)}
            >
              {label}
            </Chips.Toggle>
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
  "Vennesla",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Hvis du slår av checkmark må det være minst 3 chips, slik at det er mulig å se hvilken som er valgt.",
};
