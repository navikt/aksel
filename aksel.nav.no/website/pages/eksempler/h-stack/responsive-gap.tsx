import { HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};

const Example = () => {
  return (
    <HStack gap={{ xs: "4", sm: "6", md: "8", lg: "10", xl: "12" }}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </HStack>
  );
};

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Med responsive gap kan man redusere/øke mellomrom basert på brekkpunktene våre. Implementasjonen er mobile-first, slik at man 'sm: 8' vil sette gap for 'md', 'lg' og 'xl' også.",
};
