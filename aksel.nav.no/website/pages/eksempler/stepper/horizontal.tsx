import { withDsExample } from "@/web/examples/withDsExample";
import { Heading, Stepper } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Søknadssteg
      </Heading>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={(x) => setActiveStep(x)}
        orientation="horizontal"
      >
        <Stepper.Step href="#">Start søknad</Stepper.Step>
        <Stepper.Step href="#">Saksopplysninger</Stepper.Step>
        <Stepper.Step href="#">Vedlegg</Stepper.Step>
        <Stepper.Step href="#">Oppsummering</Stepper.Step>
        <Stepper.Step href="#">Innsending</Stepper.Step>
      </Stepper>
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
  index: 1,
  desc: "Vi anbefaler å ikke bruke horisontal stepper, spesielt på eksterne flater. Dette er for å bedre støtte mobilenheter.",
};
