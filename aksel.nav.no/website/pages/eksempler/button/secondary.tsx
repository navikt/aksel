import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button variant="secondary">Secondary</Button>;
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
