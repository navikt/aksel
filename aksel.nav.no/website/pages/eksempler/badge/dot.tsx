import { Badge, BodyShort, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-6">
      <Badge data-color="accent" />
      <BodyShort as="span" weight="semibold">
        Inbox
        <BodyShort as="span" visuallyHidden>
          med uleste meldinger
        </BodyShort>
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
