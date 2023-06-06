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

  const [selected, setSelected] = useState(["Arendal", "Nittedal"]);
  const [filter, setFilter] = useState(options);

  return (
    <div className="grid gap-4">
      <Chips size="small">
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
      <Chips size="small">
        {filter.map((c) => (
          <Chips.Removable
            key={c}
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
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
