import { HStack, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <HStack gap="space-12">
        <Tag size="medium" variant="outline">
          Medium
        </Tag>
        <Tag size="medium" variant="moderate">
          Medium
        </Tag>
        <Tag size="medium" variant="strong">
          Medium
        </Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag size="small" variant="outline">
          Small
        </Tag>
        <Tag size="small" variant="moderate">
          Small
        </Tag>
        <Tag size="small" variant="strong">
          Small
        </Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag size="xsmall" variant="outline">
          xsmall
        </Tag>
        <Tag size="xsmall" variant="moderate">
          xsmall
        </Tag>
        <Tag size="xsmall" variant="strong">
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
  index: 3,
};
