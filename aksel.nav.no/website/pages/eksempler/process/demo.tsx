import { useState } from "react";
import { PaperclipIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep] = useState(3);

  return (
    <>
      <Heading size="medium" spacing level="2" id="Process-heading">
        Søknadssteg
      </Heading>
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
