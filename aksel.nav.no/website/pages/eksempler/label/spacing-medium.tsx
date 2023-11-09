import { withDsExample } from "@/web/examples/withDsExample";
import { Label } from "@navikt/ds-react";

const Example = () => {
  const lorem =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <div>
      <Label spacing>{lorem}</Label>
      <Label spacing>{lorem}</Label>
    </div>
  );
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
