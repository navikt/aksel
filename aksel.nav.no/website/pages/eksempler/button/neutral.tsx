import { Button, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-24" align="center">
      <HStack gap="space-8">
        <Button variant="primary-neutral">Primary</Button>
        <Button variant="secondary-neutral">Secondary</Button>
        <Button variant="tertiary-neutral">Tertiary</Button>
      </HStack>
      <HStack gap="space-8">
        <Button variant="primary-neutral" size="small">
          Primary
        </Button>
        <Button variant="secondary-neutral" size="small">
          Secondary
        </Button>
        <Button variant="tertiary-neutral" size="small">
          Tertiary
        </Button>
      </HStack>
      <HStack gap="space-8">
        <Button variant="primary-neutral" size="xsmall">
          Primary
        </Button>
        <Button variant="secondary-neutral" size="xsmall">
          Secondary
        </Button>
        <Button variant="tertiary-neutral" size="xsmall">
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
  index: 1,
  desc: "Neutral-fargen brukes på handlinger som ikke trenger så mye oppmerksomhet.",
};
