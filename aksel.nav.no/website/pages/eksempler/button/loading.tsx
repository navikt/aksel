import { withDsExample } from "@/web/examples/withDsExample";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return <Button loading>Loading</Button>;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
