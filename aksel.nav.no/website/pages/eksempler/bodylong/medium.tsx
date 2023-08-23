import { BodyLong, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="4">
      <BodyLong>{lorem}</BodyLong>
      <Divider />
      <div>
        <Descriptor>Underline</Descriptor>
        <BodyLong underline>{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Semibold</Descriptor>
        <BodyLong weight="semibold">{lorem}</BodyLong>
      </div>
      <Divider />
      <div>
        <Descriptor>Truncate (ellipsis)</Descriptor>
        <BodyLong truncate>{lorem}</BodyLong>
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
  index: 0,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
