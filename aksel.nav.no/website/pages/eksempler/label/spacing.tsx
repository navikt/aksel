import { Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Label spacing as="p">
        The red fox jumps over the lazy brown dog.
      </Label>
      <Label as="p">The red fox jumps over the lazy brown dog.</Label>
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
