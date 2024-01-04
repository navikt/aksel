import { Button, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="6" align="center">
      <HStack gap="2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </HStack>
      <HStack gap="2">
        <Button variant="primary" size="small">
          Primary
        </Button>
        <Button variant="secondary" size="small">
          Secondary
        </Button>
        <Button variant="tertiary" size="small">
          Tertiary
        </Button>
      </HStack>
      <HStack gap="2">
        <Button variant="primary" size="xsmall">
          Primary
        </Button>
        <Button variant="secondary" size="xsmall">
          Secondary
        </Button>
        <Button variant="tertiary" size="xsmall">
          Tertiary
        </Button>
      </HStack>
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
  index: 0,
};
