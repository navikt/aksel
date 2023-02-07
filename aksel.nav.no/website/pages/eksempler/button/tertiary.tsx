import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="tertiary-neutral">Tertiary</Button>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
