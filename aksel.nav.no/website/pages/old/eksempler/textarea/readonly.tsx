import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Textarea label="Har du noen tilbakemeldinger?" readOnly />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 98,
  desc: "Readonly-attributtet gjør at verdien ikke kan endres, men brukere vil fortsatt kunne markere og kopiere fra feltet. Til forskjell fra disabled-felter vil brukere også kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
