import { Button, Skeleton, TextField } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Skeleton variant="rounded">
      <TextField label="E-post" />
      <Button>Send inn</Button>
    </Skeleton>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
