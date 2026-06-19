import { BodyLong, Lookup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      For at vi skal vurdere om du har rett til{" "}
      <Lookup word="APP" heading="Arbeidsavklarings­penger (AAP)">
        <BodyLong>
          Arbeidsavklaringspenger (AAP) er en midlertidig ytelse for personer
          som har nedsatt arbeidsevne på grunn av sykdom eller skade, og som
          trenger hjelp til å komme tilbake i arbeid. AAP skal bidra til å sikre
          inntekt og gi støtte til tiltak som kan forbedre arbeidsevnen.
        </BodyLong>
      </Lookup>
      , må du søke om det.
    </BodyLong>
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
};
