import { Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="6" align="center">
      <Button variant="danger">Danger</Button>
      <Button variant="danger" size="small">
        Danger
      </Button>
      <Button variant="danger" size="xsmall">
        Danger
      </Button>
    </HStack>
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
