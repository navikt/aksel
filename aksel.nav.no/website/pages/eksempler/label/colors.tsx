import { withDsExample } from "@/web/examples/withDsExample";
import { Label, VStack } from "@navikt/ds-react";

const Example = () => {
  const lorem =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>Default</Descriptor>
        <Label textColor="default">{lorem}</Label>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <Label textColor="subtle">{lorem}</Label>
      </div>
    </VStack>
  );
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
