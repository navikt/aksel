import { Button, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-24" align="center">
      <Button variant="danger">Danger</Button>
      <Button variant="danger" size="small">
        Danger
      </Button>
      <Button variant="danger" size="xsmall">
        Danger
      </Button>
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
  index: 2,
};
