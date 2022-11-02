import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button size="small">Small</Button>;
};

export default withDsExample(Example);

export const args = {
  index: 4,
};
