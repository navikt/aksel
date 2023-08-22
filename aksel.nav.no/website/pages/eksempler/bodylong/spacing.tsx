import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <BodyLong spacing>
        Har du utgifter i forbindelse med at du søker jobb, deltar på kurs eller
        tar utdanning? Du kan ha rett til tilleggsstønader for å dekke deler av
        disse utgiftene, som for eksempel utgifter til reise eller flytting.
      </BodyLong>
      <BodyLong>
        Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til
        barnebidrag fra en eller begge foreldre mens du fullfører videregående
        skole eller tilsvarende.
      </BodyLong>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
