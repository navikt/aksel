import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="4">
      <BodyLong size="large">{lorem}</BodyLong>
      <Divider />
      <div>
        <Descriptor>Semibold</Descriptor>
        <BodyLong size="large" weight="semibold">
          {lorem}
        </BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Truncate (ellipsis)</Descriptor>
        <BodyLong size="large" truncate>
          {lorem}
        </BodyLong>
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
