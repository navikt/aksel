import { useState } from "react";
import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep] = useState(1);

  return (
    <>
      <Heading size="medium" spacing level="2" id="process-heading">
        Steg
      </Heading>
      <Process aria-labelledby="process-heading" activeStep={activeStep}>
        <Process.Step>Innledning</Process.Step>
        <Process.Step>Saksopplysninger</Process.Step>
        <Process.Step>Begrunnelse</Process.Step>
        <Process.Step>Oppsummering</Process.Step>
        <Process.Step>Bekreftelse</Process.Step>
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
