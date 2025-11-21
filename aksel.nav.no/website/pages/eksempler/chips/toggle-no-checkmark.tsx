import { useState } from "react";
import { Chips } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selected, setSelected] = useState(3);

  return (
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
