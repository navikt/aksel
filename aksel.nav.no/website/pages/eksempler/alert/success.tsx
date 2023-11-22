import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return <Alert variant="success">Søknad er sendt inn!</Alert>;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Bekrefter at en oppgave er fullført som forventet.",
};
