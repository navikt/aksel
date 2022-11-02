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
        Magna aliqua et adipisicing nostrud elit ea. Id ipsum ut laborum ut
        adipisicing magna laboris pariatur commodo quis nulla ea aliquip mollit.
        Nisi aliquip voluptate laboris nisi eiusmod labore eu non. Deserunt sint
        incididunt est sunt ex labore irure irure est eiusmod.
      </BodyLong>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
