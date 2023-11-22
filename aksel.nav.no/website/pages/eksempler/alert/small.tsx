import { withDsExample } from "@/web/examples/withDsExample";
import { Alert, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="4" align="center">
      <Alert size="small" variant="success">
        Søknad er sendt inn!
      </Alert>
      <Alert size="small" variant="success" inline>
        Søknad er sendt inn!
      </Alert>
    </VStack>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
