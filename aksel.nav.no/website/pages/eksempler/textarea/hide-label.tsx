import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Textarea label="Har du noen tilbakemeldinger?" hideLabel />;
};

export default withDsExample(Example);

export const args = {
  index: 3,
};
