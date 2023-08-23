import { Detail, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <Detail color="default">{lorem}</Detail>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <Detail color="subtle">{lorem}</Detail>
      </div>
      <Divider />
      <div className="bg-surface-inverted text-text-on-inverted">
        <Descriptor>On-inverted</Descriptor>
        <Detail color="on-inverted">{lorem}</Detail>
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
  index: 2,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
