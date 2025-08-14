import { useState } from "react";
import { PaperclipIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, HStack, Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <HStack gap="4">
        <Button onClick={() => setActiveStep(0)}>activeStep=0</Button>
        <Button onClick={() => setActiveStep(3)}>activeStep=3</Button>
        <Button onClick={() => setActiveStep(5)}>activeStep=5</Button>
      </HStack>

      <Process
        aria-labelledby="Process-heading"
        activeStep={activeStep}
        variant="number"
        hideCompletedContent={true}
      >
        <Process.Step title="Start søknad" date="21. august 2025" />
        <Process.Step
          title="Saksopplysninger"
          date="22. august 2025"
          icon={<PaperclipIcon />}
        >
          Saksopplysninger er sendt inn
        </Process.Step>
        <Process.Step
          title="Vedlegg"
          date="25. august 2025"
          hideContent={false}
        >
          <Heading size="small">Vedlegg er lastet opp</Heading>
          <BodyLong>
            Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
            saksbehandler.
          </BodyLong>
        </Process.Step>
        <Process.Step
          title="Vedtak"
          date="8. september 2025"
          hideContent={true}
        >
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
