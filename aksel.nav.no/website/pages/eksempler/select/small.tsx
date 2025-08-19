import { Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Select label="Velg bostedsland" size="small">
      <option>- Velg land -</option>
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
  index: 1,
};
