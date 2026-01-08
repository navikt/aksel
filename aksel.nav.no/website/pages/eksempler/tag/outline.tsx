import { HStack, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-12">
      <Tag variant="outline" data-color="accent">
        Accent
      </Tag>
      <Tag variant="outline" data-color="neutral">
        Neutral
      </Tag>
      <Tag variant="outline" data-color="brand-beige">
        Brand Beige
      </Tag>
      <Tag variant="outline" data-color="brand-blue">
        Brand Blue
      </Tag>
      <Tag variant="outline" data-color="brand-magenta">
        Brand Magenta
      </Tag>
      <Tag variant="outline" data-color="info">
        Info
      </Tag>
      <Tag variant="outline" data-color="success">
        Success
      </Tag>
      <Tag variant="outline" data-color="warning">
        Warning
      </Tag>
      <Tag variant="outline" data-color="danger">
        Danger
      </Tag>
      <Tag variant="outline" data-color="meta-purple">
        Meta Purple
      </Tag>
      <Tag variant="outline" data-color="meta-lime">
        Meta Lime
      </Tag>
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
  index: 0,
};
