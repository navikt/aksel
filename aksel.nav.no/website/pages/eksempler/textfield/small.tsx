import { withDsExample } from "@/web/examples/withDsExample";
import { TextField } from "@navikt/ds-react";

const Example = () => {
  return <TextField label="Har du noen tilbakemeldinger?" size="small" />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
