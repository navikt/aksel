import { Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-8">
      <Button data-color="danger" variant="primary">
        Primary
      </Button>
      <Button data-color="danger" variant="secondary">
        Secondary
      </Button>
      <Button data-color="danger" variant="tertiary">
        Tertiary
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
  desc: "For handlinger som kan føre til tap av data eller andre negative konsekvenser for brukeren, bør du bruke en 'destruktiv' knapp.",
};
