import { Chips } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

  const [filter, setFilter] = useState(options);

  return (
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
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
