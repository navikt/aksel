import { withDsExample } from "@/web/examples/withDsExample";
import { Button, Skeleton, TextField } from "@navikt/ds-react";

const Example = () => {
  return (
    <Skeleton variant="rounded">
      <TextField label="E-post" />
      <Button>Send inn</Button>
    </Skeleton>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
