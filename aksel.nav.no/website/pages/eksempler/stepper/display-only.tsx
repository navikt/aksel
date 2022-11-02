import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Søknadssteg
      </Heading>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={2}
        interactive={false}
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

export const args = {
  index: 3,
};
