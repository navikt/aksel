import { ComponentIcon } from "@navikt/aksel-icons";
import { HStack, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
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
