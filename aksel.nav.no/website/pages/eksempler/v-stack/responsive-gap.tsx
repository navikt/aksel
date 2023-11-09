import { withDsExample } from "@/web/examples/withDsExample";
import { VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap={{ xs: "4", sm: "6", md: "8", lg: "10", xl: "12" }}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </VStack>
  );
};

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Med responsive gap kan man redusere/øke mellomrom basert på brekkpunktene våre",
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};
