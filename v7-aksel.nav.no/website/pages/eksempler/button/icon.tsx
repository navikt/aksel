import { PencilIcon } from "@navikt/aksel-icons";
import { Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-24">
      <Button icon={<PencilIcon aria-hidden />}>Rediger</Button>
      <Button icon={<PencilIcon title="Rediger" />} />
      <Button iconPosition="right" icon={<PencilIcon aria-hidden />}>
        Rediger
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
  index: 4,
};
