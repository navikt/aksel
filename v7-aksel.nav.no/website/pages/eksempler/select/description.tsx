import { Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Select
      label="Velg bostedsland"
      description="Velg det landet du tilbringer mest tid."
    >
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
  index: 2,
  desc: "Bruk `description` i tillegg til `label` når det er behov for mer utfyllende forklaring.",
};
