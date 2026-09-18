import { BodyShort, HStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-6">
      <Badge data-color="accent" aria-label="Uleste meldinger" />
      <BodyShort as="span" weight="semibold">
        Inbox
      </BodyShort>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 1,
};
