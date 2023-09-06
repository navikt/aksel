import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <BodyShort textColor="default">{lorem}</BodyShort>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <BodyShort textColor="subtle">{lorem}</BodyShort>
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
  index: 6,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
