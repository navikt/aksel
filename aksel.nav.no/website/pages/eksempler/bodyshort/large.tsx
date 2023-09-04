import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <BodyShort size="large">{lorem}</BodyShort>
      <Divider />
      <div>
        <Descriptor>Semibold</Descriptor>
        <BodyShort size="large" weight="semibold">
          {lorem}
        </BodyShort>
      </div>
      <Divider />
      <div>
        <Descriptor>Truncate (ellipsis)</Descriptor>
        <BodyShort size="large" truncate>
          {lorem}
        </BodyShort>
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
  index: 1,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
