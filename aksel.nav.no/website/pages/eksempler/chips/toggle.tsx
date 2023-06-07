import { Chips } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

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

  const [selected, setSelected] = useState(["Nittedal", "Arendal"]);

  return (
    <Chips>
      {options.map((c) => (
        <Chips.Toggle
          selected={selected.includes(c)}
          key={c}
          onClick={() =>
            setSelected(
              selected.includes(c)
                ? selected.filter((x) => x !== c)
                : [...selected, c]
            )
          }
        >
          {c}
        </Chips.Toggle>
      ))}
    </Chips>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
