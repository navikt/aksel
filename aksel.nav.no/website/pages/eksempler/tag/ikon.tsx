import { HStack, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { ComponentIcon } from "@navikt/aksel-icons";

const Example = () => {
  return (
    <VStack gap="4">
      <HStack gap="2" align="start">
        <Tag variant="neutral-moderate" icon={<ComponentIcon aria-hidden />}>
          Ikon
        </Tag>
        <Tag
          size="small"
          variant="neutral-moderate"
          icon={<ComponentIcon aria-hidden />}
        >
          Ikon
        </Tag>
        <Tag
          size="xsmall"
          variant="neutral-moderate"
          icon={<ComponentIcon aria-hidden />}
        >
          Ikon
        </Tag>
      </HStack>
      <HStack gap="2" align="start">
        <Tag
          variant="neutral-moderate"
          icon={<ComponentIcon aria-hidden />}
          iconPosition="right"
        >
          Ikon
        </Tag>
        <Tag
          size="small"
          variant="neutral-moderate"
          icon={<ComponentIcon aria-hidden />}
          iconPosition="right"
        >
          Ikon
        </Tag>
        <Tag
          size="xsmall"
          variant="neutral-moderate"
          icon={<ComponentIcon aria-hidden />}
          iconPosition="right"
        >
          Ikon
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
  index: 5,
  desc: "Hvis ikon bare er illustrativt, husk å legge til 'aria-hidden'.",
};
