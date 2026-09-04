import { useState } from "react";
import { Chips, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [filter, setFilter] = useState(options);

  return (
    <VStack gap="space-20">
      <Chips data-color="neutral">
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

      <Chips data-color="brand-magenta">
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

export const args: ExampleArgsT = {
  index: 4,
  desc: "`data-color` kan brukes for å endre farge på chipsene.",
};
