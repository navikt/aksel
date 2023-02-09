import { GuidePanel } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <GuidePanel poster>
      Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
      enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
      er forlenget.
    </GuidePanel>
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
