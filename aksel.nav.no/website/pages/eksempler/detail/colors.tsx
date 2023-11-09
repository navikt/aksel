import { withDsExample } from "@/web/examples/withDsExample";
import { Detail, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <Detail textColor="default">{lorem}</Detail>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <Detail textColor="subtle">{lorem}</Detail>
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
  index: 2,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
