import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="space-20">
      <BodyShort textColor="default">
        <b>Default:</b> {exampleText}
      </BodyShort>
      <BodyShort textColor="subtle">
        <b>Subtle:</b> {exampleText}
      </BodyShort>
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
