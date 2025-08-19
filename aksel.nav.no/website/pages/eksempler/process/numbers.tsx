import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Hva skjer etter at du har sendt inn søknad til oss?
      </Heading>
      <Process aria-labelledby="Process-heading" activeStep={2}>
        <Process.Event title="Legeerklæring" bullet={1} />
        <Process.Event title="Inntektsmelding fra arbeidsgiver" bullet={2} />
        <Process.Event title="Vi behandler søknaden din" bullet={3} />
        <Process.Event title="Når søknaden er ferdig behandlet" bullet={4} />
        <Process.Event title="Utbetaling" bullet={5} />
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Du kan bruke `bullet` for å vise et nummer i hvert steg. Dette kan være nyttig for å vise rekkefølgen på stegene i en allerede kjent prosess.",
};
