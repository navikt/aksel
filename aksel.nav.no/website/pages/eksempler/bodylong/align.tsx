import { BodyLong, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Start</Descriptor>
        <BodyLong align="start">{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Center</Descriptor>
        <BodyLong align="center">{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>End</Descriptor>
        <BodyLong align="end">{lorem}</BodyLong>
      </div>
    </VStack>
  );
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
