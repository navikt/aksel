import { Alert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
