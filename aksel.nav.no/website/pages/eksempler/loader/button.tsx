import { withDsExample } from "@/web/examples/withDsExample";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return <Button loading>Lagre</Button>;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

export const args = {
  index: 5,
};
