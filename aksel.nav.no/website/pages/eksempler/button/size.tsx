import { SparklesIcon } from "@navikt/aksel-icons";
import { Button, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8">
      <Button size="medium" icon={<SparklesIcon aria-hidden />}>
        Medium
      </Button>
      <Button size="small" icon={<SparklesIcon aria-hidden />}>
        Small
      </Button>
      <Button size="xsmall" icon={<SparklesIcon aria-hidden />}>
        xsmall
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
  index: 3,
  desc: "Knappene kommer i tre størrelser: medium, small og xsmall. xsmall brukes kun i spesielle tilfeller der det er begrenset plass, for eksempel i tabeller.",
};
