import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Start</Descriptor>
        <BodyShort align="start">{lorem}</BodyShort>
      </div>
      <Divider />
      <div>
        <Descriptor>Center</Descriptor>
        <BodyShort align="center">{lorem}</BodyShort>
      </div>
      <Divider />
      <div>
        <Descriptor>End</Descriptor>
        <BodyShort align="end">{lorem}</BodyShort>
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
  index: 7,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
