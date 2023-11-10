import { withDsExample } from "@/web/examples/withDsExample";
import { Detail, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <Detail>{lorem}</Detail>
      <Divider />
      <div>
        <Descriptor>Semibold</Descriptor>
        <Detail weight="semibold">{lorem}</Detail>
      </div>
      <Divider />
      <div>
        <Descriptor>Truncate (ellipsis)</Descriptor>
        <Detail truncate>{lorem}</Detail>
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
  index: 0,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
