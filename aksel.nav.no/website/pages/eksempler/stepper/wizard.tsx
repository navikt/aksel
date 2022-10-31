import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Søknadssteg
      </Heading>
      <Stepper aria-labelledby="stepper-heading" activeStep={3}>
        <Stepper.Step href="#" completed>
          Start søknad
        </Stepper.Step>
        <Stepper.Step href="#" completed>
          Saksopplysninger
        </Stepper.Step>
        <Stepper.Step href="#">Vedlegg</Stepper.Step>
        <Stepper.Step href="#" interactive={false}>
          Oppsummering
        </Stepper.Step>
        <Stepper.Step href="#" interactive={false}>
          Innsending
        </Stepper.Step>
      </Stepper>
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 3,
  desc: "Med hjelp av interactive og completed kan man bygge opp wizard-lignende løsninger.",
};
