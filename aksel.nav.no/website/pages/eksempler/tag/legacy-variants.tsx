import { HStack, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <HStack gap="space-12">
        <Tag variant="neutral">Neutral</Tag>
        <Tag variant="info">Info</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="error">Error</Tag>
        <Tag variant="alt1">Alt1</Tag>
        <Tag variant="alt2">Alt2</Tag>
        <Tag variant="alt3">Alt3</Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag variant="neutral-moderate">Neutral</Tag>
        <Tag variant="info-moderate">Info</Tag>
        <Tag variant="success-moderate">Success</Tag>
        <Tag variant="warning-moderate">Warning</Tag>
        <Tag variant="error-moderate">Error</Tag>
        <Tag variant="alt1-moderate">Alt1</Tag>
        <Tag variant="alt2-moderate">Alt2</Tag>
        <Tag variant="alt3-moderate">Alt3</Tag>
      </HStack>
      <HStack gap="space-12">
        <Tag variant="neutral-filled">Neutral</Tag>
        <Tag variant="info-filled">Info</Tag>
        <Tag variant="success-filled">Success</Tag>
        <Tag variant="warning-filled">Warning</Tag>
        <Tag variant="error-filled">Error</Tag>
        <Tag variant="alt1-filled">Alt1</Tag>
        <Tag variant="alt2-filled">Alt2</Tag>
        <Tag variant="alt3-filled">Alt3</Tag>
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
  index: 4,
  desc: "Legacy-varianter for Tag. Bruk outline, moderate eller strong for nye løsninger + `data-color`.",
};
