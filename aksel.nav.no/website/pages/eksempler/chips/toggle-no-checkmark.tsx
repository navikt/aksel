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

  const [selected, setSelected] = useState(3);

  return (
    <Chips>
      {options.map((c, y) => (
        <Chips.Toggle
          selected={selected === y}
          checkmark={false}
          key={c}
          onClick={() => setSelected(y)}
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
  index: 3,
};
