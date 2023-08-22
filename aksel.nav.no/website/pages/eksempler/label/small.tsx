import { Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Label size="small">
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
  index: 2,
};
