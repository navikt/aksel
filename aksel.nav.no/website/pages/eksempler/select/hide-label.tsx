import { withDsExample } from "@/web/examples/withDsExample";
import { Select } from "@navikt/ds-react";

const Example = () => {
  return (
    <Select label="Hvilket land har du bosted i?" hideLabel>
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
