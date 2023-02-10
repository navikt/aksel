import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
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

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
