import { Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Label>
      Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om
      refusjon.
    </Label>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Label rendres i dag som et 'label'-element. Husk å endre til riktig tag ved bruk av 'as'-prop hvis du vil bruke eks span/p",
};
