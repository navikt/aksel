import { HStack, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <HStack gap="space-12">
        <Tag size="medium" variant="neutral">
          Medium
        </Tag>
        <Tag size="medium" variant="neutral-moderate">
          Medium
        </Tag>
        <Tag size="medium" variant="neutral-filled">
          Medium
        </Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag size="small" variant="neutral">
          Small
        </Tag>
        <Tag size="small" variant="neutral-moderate">
          Small
        </Tag>
        <Tag size="small" variant="neutral-filled">
          Small
        </Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag size="xsmall" variant="neutral">
          xsmall
        </Tag>
        <Tag size="xsmall" variant="neutral-moderate">
          xsmall
        </Tag>
        <Tag size="xsmall" variant="neutral-filled">
          xsmall
        </Tag>
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
};
