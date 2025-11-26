import { Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-8">
      <Button disabled variant="primary">
        Primary
      </Button>
      <Button disabled variant="secondary">
        Secondary
      </Button>
      <Button disabled variant="tertiary">
        Tertiary
      </Button>
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
  index: 20,
  desc: "Vi fraråder bruk av disabled state da elementet blir gjemt fra hjelpeteknologier og ofte vil være vanskelig å oppfatte visuelt.",
};
