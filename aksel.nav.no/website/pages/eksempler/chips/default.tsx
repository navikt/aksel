import { Chips } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

  const [selected, setSelected] = useState(["Dansk", "Svensk"]);
  const [filter, setFilter] = useState(options);

  return (
    <div className="grid gap-4">
      <Chips>
        {options.map((c) => (
          <Chips.Filter
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
          </Chips.Filter>
        ))}
      </Chips>
      <Chips>
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

export const args = {
  index: 0,
};
