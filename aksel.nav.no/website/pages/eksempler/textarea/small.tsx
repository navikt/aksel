import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Textarea label="Har du noen tilbakemeldinger?" size="small" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Small brukes på interne flater der det er behov for et mer komprimert grensesnitt.",
};
