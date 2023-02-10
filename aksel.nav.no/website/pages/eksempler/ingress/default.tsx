import { Ingress } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Ingress>
      Blir du sykmeldt, trenger du å vite hvilke regler som gjelder mens du er
      syk og hva som kreves for å få utbetalt sykepenger.
    </Ingress>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
