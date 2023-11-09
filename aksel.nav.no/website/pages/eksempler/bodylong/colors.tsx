import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <BodyLong textColor="default">{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <BodyLong textColor="subtle">{lorem}</BodyLong>
      </div>
    </VStack>
  );
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
