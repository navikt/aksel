import { Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return <Label size="small">{lorem}</Label>;
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
