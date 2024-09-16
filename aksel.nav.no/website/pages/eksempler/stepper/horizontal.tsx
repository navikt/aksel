import { useState } from "react";
import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Steg
      </Heading>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={setActiveStep}
        orientation="horizontal"
      >
        <Stepper.Step href="#">Innledning</Stepper.Step>
        <Stepper.Step href="#">Saksopplysninger</Stepper.Step>
        <Stepper.Step href="#">Begrunnelse</Stepper.Step>
        <Stepper.Step href="#">Oppsummering</Stepper.Step>
        <Stepper.Step href="#">Bekreftelse</Stepper.Step>
      </Stepper>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Vi anbefaler å ikke bruke horisontal stepper, da den fungerer dårlig på mindre skjermer.",
};
