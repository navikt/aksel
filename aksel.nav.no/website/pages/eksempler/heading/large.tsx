import { withDsExample } from "@/web/examples/withDsExample";
import { Heading, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Hva kan vi hjelpe deg med?";

  return (
    <VStack gap="4">
      <Heading size="large">{lorem}</Heading>
      <Divider />
      <div>
        <Descriptor>Spacing </Descriptor>
        <Heading size="large">{lorem}</Heading>
      </div>
    </VStack>
  );
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
