import { Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Select label="Velg bostedsland" readOnly value="sverige">
      <option value="">- Velg land -</option>
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
  index: 98,
  desc: "Readonly-attributtet gjør at verdien ikke kan endres. Til forskjell fra disabled-felter vil brukere fortsatt kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
