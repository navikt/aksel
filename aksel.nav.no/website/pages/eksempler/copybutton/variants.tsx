import { CopyButton, HStack, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="12">
      <VStack gap="3">
        <Heading size="small">Neutral</Heading>
        <HStack gap="3">
          <CopyButton copyText="3.14" />
          <CopyButton copyText="3.14" text="Kopier" />
        </HStack>
        <HStack gap="8">
          <CopyButton copyText="3.14" size="small" />
          <CopyButton copyText="3.14" size="small" text="Kopier" />
        </HStack>
      </VStack>
      <VStack gap="3">
        <Heading size="small">Action</Heading>
        <HStack gap="3">
          <CopyButton copyText="3.14" variant="action" />
          <CopyButton copyText="3.14" variant="action" text="Kopier" />
        </HStack>
        <HStack gap="8">
          <CopyButton copyText="3.14" variant="action" size="small" />
          <CopyButton
            copyText="3.14"
            variant="action"
            size="small"
            text="Kopier"
          />
        </HStack>
      </VStack>
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
};
