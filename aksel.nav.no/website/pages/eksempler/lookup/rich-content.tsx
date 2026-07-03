import { BodyLong, Link, Lookup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      For at vi skal vurdere om du har rett til{" "}
      <Lookup word="AAP">
        <BodyLong spacing>
          Arbeidsavklaringspenger (AAP) er en midlertidig ytelse for personer
          som har nedsatt arbeidsevne på grunn av sykdom eller skade, og som
          trenger hjelp til å komme tilbake i arbeid.{" "}
        </BodyLong>
        <Link href="https://www.nav.no/aap">
          Du kan lese mer om AAP på nav.no.
        </Link>
      </Lookup>
      , må du søke om det.
    </BodyLong>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "13rem",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Popoveren som åpnes kan inneholde rikt innhold, for eksempel flere avsnitt, lenker eller en liste.",
};
