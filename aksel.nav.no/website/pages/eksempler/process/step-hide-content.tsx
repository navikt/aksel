import { BodyLong, Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Process activeStep={6} hideCompletedContent={true}>
        <Process.Step title="Start søknad" />
        <Process.Step date="11. august 2025" />
        <Process.Step title="Personopplysninger" date="20. august 2025" />
        <Process.Step title="Saksopplysniner" date="22. august 2025">
          Send inn saksopplysninger
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
        <Process.Step title="Saksbehandlingsfrist" date="25. september 2025">
          Frist for å samle inn saksinformasjon og gjøre vedtak.
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
