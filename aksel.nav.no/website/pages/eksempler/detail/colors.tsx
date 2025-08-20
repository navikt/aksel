import { Detail, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="space-20">
      <Detail textColor="default">Default: {exampleText}</Detail>
      <Detail textColor="subtle">Subtle: {exampleText}</Detail>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
