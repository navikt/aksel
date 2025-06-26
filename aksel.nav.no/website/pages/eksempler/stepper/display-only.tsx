import { Heading, Stepper } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing level="2" id="stepper-heading">
        Behandlingsprosess
      </Heading>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={2}
        interactive={false}
      >
        <Stepper.Step completed>Søknad mottatt</Stepper.Step>
        <Stepper.Step>Behandling opprettet</Stepper.Step>
        <Stepper.Step>Forslag til vedtak</Stepper.Step>
        <Stepper.Step>Vedtak fattet</Stepper.Step>
        <Stepper.Step>Vedtak skrevet til Arena</Stepper.Step>
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
  index: 2,
};
