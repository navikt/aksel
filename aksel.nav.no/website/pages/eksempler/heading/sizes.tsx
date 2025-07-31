import { Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Heading size="xlarge">
        Dette er en overskrift i xlarge (Desktop: 40px, Mobil: 32px)
      </Heading>
      <Heading size="large">
        Dette er en overskrift i large (Desktop: 32px, Mobil: 28px)
      </Heading>
      <Heading size="medium">Dette er en overskrift i medium (24px)</Heading>
      <Heading size="small">Dette er en overskrift i small (20px)</Heading>
      <Heading size="xsmall">Dette er en overskrift i xsmall (18px)</Heading>
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
  index: 0,
};
