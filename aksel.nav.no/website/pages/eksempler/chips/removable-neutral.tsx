import { useState } from "react";
import { Chips } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
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

  const [filter, setFilter] = useState(options);

  return (
    <Chips>
      {filter.map((c) => (
        <Chips.Removable
          key={c}
          variant="neutral"
          onClick={() =>
            setFilter((x) =>
              x.length === 1 ? options : x.filter((y) => y !== c)
            )
          }
        >
          {c}
        </Chips.Removable>
      ))}
    </Chips>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Removable chip viser valgte verdier som brukeren kan fjerne.",
};
