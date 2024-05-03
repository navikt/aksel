import { Label } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <>
      <Label spacing as="p">
        {exampleText}
      </Label>

      <Label spacing as="p">
        {exampleText}
      </Label>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Propen 'spacing' legger til margin-bottom. Avstanden varierer avhengig av 'size'.",
};
