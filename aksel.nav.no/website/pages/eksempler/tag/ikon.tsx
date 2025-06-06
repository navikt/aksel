import { ComponentIcon } from "@navikt/aksel-icons";
import { HStack, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="3" align="start">
      <Tag variant="neutral-moderate" icon={<ComponentIcon aria-hidden />}>
        Medium
      </Tag>
      <Tag
        size="small"
        variant="neutral-moderate"
        icon={<ComponentIcon aria-hidden />}
      >
        Small
      </Tag>
      <Tag
        size="xsmall"
        variant="neutral-moderate"
        icon={<ComponentIcon aria-hidden />}
      >
        Xsmall
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
  index: 2,
  desc: "Husk å legge til 'aria-hidden' hvis ikonet bare er illustrativt.",
};
