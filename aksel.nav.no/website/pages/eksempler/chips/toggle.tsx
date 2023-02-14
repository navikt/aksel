import { Chips } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

  const [selected, setSelected] = useState(["Dansk", "Svensk"]);

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
