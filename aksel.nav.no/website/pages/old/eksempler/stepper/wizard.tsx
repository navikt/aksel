import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Steg
      </Heading>
      <Stepper aria-labelledby="stepper-heading" activeStep={3}>
        <Stepper.Step href="#" completed>
          Innledning
        </Stepper.Step>
        <Stepper.Step href="#" completed>
          Saksopplysninger
        </Stepper.Step>
        <Stepper.Step href="#">Begrunnelse</Stepper.Step>
        <Stepper.Step href="#" interactive={false}>
          Oppsummering
        </Stepper.Step>
        <Stepper.Step href="#" interactive={false}>
          Bekreftelse
        </Stepper.Step>
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
  desc: "Ved hjelp av propene 'interactive' og 'completed' kan man bygge opp wizard-lignende løsninger, der fullførte steg er merket med checkmark og fremtidige steg er låst.",
};
