import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="5">
      <BodyShort weight="regular">Regular (default): {exampleText}</BodyShort>
      <BodyShort weight="semibold">Semibold: {exampleText}</BodyShort>
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
  index: 1,
};
