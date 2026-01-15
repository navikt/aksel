import { Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-8">
      <Button data-color="neutral" variant="primary">
        Primary
      </Button>
      <Button data-color="neutral" variant="secondary">
        Secondary
      </Button>
      <Button data-color="neutral" variant="tertiary">
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
  index: 1,
  desc: "For handlinger som ikke trenger så mye oppmerksomhet, kan du bruke en 'nøytral' knapp.",
};
