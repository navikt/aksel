import { useState } from "react";
import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <Heading size="medium" spacing level="2" id="process-heading">
        Steg
      </Heading>
      <Process
        aria-labelledby="process-heading"
        activeStep={activeStep}
        onStepChange={setActiveStep}
      >
        <Process.Step href="#">Innledning</Process.Step>
        <Process.Step href="#">Saksopplysninger</Process.Step>
        <Process.Step href="#">Begrunnelse</Process.Step>
        <Process.Step href="#">Oppsummering</Process.Step>
        <Process.Step href="#">Bekreftelse</Process.Step>
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
