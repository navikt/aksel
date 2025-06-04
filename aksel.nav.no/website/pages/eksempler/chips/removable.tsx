import { useState } from "react";
import { Chips, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [filter, setFilter] = useState(options);

  return (
    <VStack gap="10">
      <VStack gap="3">
        Variant action (default)
        <Chips>
          {filter.map((c) => (
            <Chips.Removable
              key={c}
              onClick={() =>
                setFilter((x) =>
                  x.length === 1 ? options : x.filter((y) => y !== c),
                )
              }
            >
              {c}
            </Chips.Removable>
          ))}
        </Chips>
      </VStack>
      <VStack gap="3">
        Variant neutral
        <Chips>
          {filter.map((c) => (
            <Chips.Removable
              variant="neutral"
              key={c}
              onClick={() =>
                setFilter((x) =>
                  x.length === 1 ? options : x.filter((y) => y !== c),
                )
              }
            >
              {c}
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
  index: 2,
  desc: "Removable chips viser valgte verdier som brukeren kan fjerne, for eksempel valgte filter eller verdier som brukeren har skrevet i tekstfelt.",
};
