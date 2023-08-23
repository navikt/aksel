import { Label, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <Label color="default">{lorem}</Label>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <Label color="subtle">{lorem}</Label>
      </div>
      <Divider />
      <div className="bg-surface-inverted text-text-on-inverted">
        <Descriptor>On-inverted</Descriptor>
        <Label color="on-inverted">{lorem}</Label>
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
  index: 4,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
