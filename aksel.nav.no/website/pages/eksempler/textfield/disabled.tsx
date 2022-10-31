import { TextField } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <TextField label="Har du noen tilbakemeldinger?" disabled />;
};

export default withDsExample(Example);

export const args = {
  index: 10,
};
