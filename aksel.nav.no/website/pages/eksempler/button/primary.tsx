import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button>Primary</Button>;
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
