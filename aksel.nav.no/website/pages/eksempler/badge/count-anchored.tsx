import { Button, VStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-12">
      <Badge count={5}>
        <Button variant="secondary" aria-label="Meldinger, 5 uleste">
          Meldinger
        </Button>
      </Badge>
      <Badge count={120}>
        <Button variant="secondary" aria-label="Meldinger, 120 uleste">
          Meldinger
        </Button>
      </Badge>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 2,
};
