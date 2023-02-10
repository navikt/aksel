import { TextField } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <TextField
      label="Har du noen tilbakemeldinger?"
      description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."
    />
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
