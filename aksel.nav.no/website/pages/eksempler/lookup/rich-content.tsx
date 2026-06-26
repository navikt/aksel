import { BodyLong, BodyShort, Link, Lookup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      For at vi skal vurdere om du har rett til{" "}
      <Lookup word="APP">
        <BodyShort>
          Som hovedregel kan du ha rett til AAP hvis alt dette gjelder deg:
        </BodyShort>
        <ul>
          <li>
            Arbeidsevnen din er nedsatt med minst 50 prosent på grunn av sykdom
            eller skade.
          </li>
          <li>
            Arbeidsevnen din er nedsatt til alle typer arbeid du er kvalifisert
            for.
          </li>
          <li>
            Du trenger behandling for å bedre arbeidsevnen din, eller hjelp fra
            Nav for å beholde eller skaffe arbeid.
          </li>
          <li>
            Du har vært medlem i folketrygden sammenhengende i minst 5 år når du
            søker om AAP.
          </li>
          <li>Du er mellom 18 og 67 år.</li>
        </ul>
        <Link href="https://www.nav.no/aap">
          Du kan lese mer om AAP på nav.no.
        </Link>
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
  desc: "Popoveren som åpnes kan inneholde rikt innhold, for eksempel flere avsnitt, lenker eller en liste",
};
