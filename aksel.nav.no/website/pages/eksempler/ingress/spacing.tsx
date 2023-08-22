import { BodyLong, Ingress } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Ingress spacing>
        Blir du sykmeldt, trenger du å vite hvilke regler som gjelder mens du er
        syk og hva som kreves for å få utbetalt sykepenger.
      </Ingress>
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
