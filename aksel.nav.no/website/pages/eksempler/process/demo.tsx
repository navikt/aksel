import { useState } from "react";
import { PaperclipIcon } from "@navikt/aksel-icons";
import { Heading, Process } from "@navikt/ds-react";
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
          <h2> Vedlegg er lastet opp </h2>
          <p>
            Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
            saksbehandler.
          </p>
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
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
