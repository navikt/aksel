import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary-neutral">Secondary</Button>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
