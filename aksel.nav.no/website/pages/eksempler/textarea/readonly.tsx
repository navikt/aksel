import { withDsExample } from "@/web/examples/withDsExample";
import { Textarea } from "@navikt/ds-react";

const Example = () => {
  return <Textarea label="Har du noen tilbakemeldinger?" readOnly />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 98,
};
