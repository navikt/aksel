import { Detail, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Start</Descriptor>
        <Detail align="start">{lorem}</Detail>
      </div>
      <Divider />
      <div>
        <Descriptor>Center</Descriptor>
        <Detail align="center">{lorem}</Detail>
      </div>
      <Divider />
      <div>
        <Descriptor>End</Descriptor>
        <Detail align="end">{lorem}</Detail>
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
  index: 3,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
