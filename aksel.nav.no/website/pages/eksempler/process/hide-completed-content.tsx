import { useState } from "react";
import { BodyLong, Button, HStack, Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <>
      <HStack gap="4">
        <Button onClick={() => setActiveStep(0)}>activeStep=0</Button>
        <Button onClick={() => setActiveStep(3)}>activeStep=3</Button>
        <Button onClick={() => setActiveStep(5)}>activeStep=5</Button>
      </HStack>
      <Process activeStep={activeStep} hideCompletedContent={true}>
        <Process.Step title="Start søknad" date="21. august 2025">
          Søknadsprosessen er igangsatt.
        </Process.Step>
        <Process.Step title="Saksopplysninger" date="22. august 2025">
          Saksopplysninger er sendt inn
        </Process.Step>
        <Process.Step title="Vedlegg" date="25. august 2025">
          <Heading size="small">Vedlegg er lastet opp</Heading>
          <BodyLong>
            Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
            saksbehandler.
          </BodyLong>
        </Process.Step>
        <Process.Step title="Vedtak" date="8. september 2025">
          Det er gjort endelig vedtak i saken
        </Process.Step>
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const VariantNumber = {
  render: Example,
};

export const args = {
  index: 0,
};
