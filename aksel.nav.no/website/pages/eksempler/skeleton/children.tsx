import { Button, Skeleton, TextField } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Skeleton variant="rounded">
      <Button variant="secondary">Avbryt</Button>
      <Button>Send inn</Button>
      <TextField label="E-post" />
      <TextField label="Telefonnummer" />
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
