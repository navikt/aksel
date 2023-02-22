import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      error="Tilbakemeldingen er for kort."
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
