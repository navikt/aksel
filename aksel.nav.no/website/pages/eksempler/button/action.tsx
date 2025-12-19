import { Button, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-24" align="center">
      <HStack gap="space-8">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </HStack>
      <HStack gap="space-8">
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
      <HStack gap="space-8">
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
  desc: "Action-fargen (standard) brukes på handlinger som skal ha oppmerksomhet og er en del av den planlagte flyten i løsningen.",
};
