import { BodyLong, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <BodyLong color="default">{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <BodyLong color="subtle">{lorem}</BodyLong>
      </div>
      <Divider />
      <div className="bg-surface-inverted text-text-on-inverted">
        <Descriptor>On-inverted</Descriptor>
        <BodyLong color="on-inverted">{lorem}</BodyLong>
      </div>
    </VStack>
  );
};

export default withDsExample(Example);

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
