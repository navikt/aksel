import { Label } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const lorem =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <div>
      <Label spacing as="p">
        {lorem}
      </Label>
      <Label spacing as="p">
        {lorem}
      </Label>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
