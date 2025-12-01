import { BodyShort, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="space-20">
      <BodyShort align="start">
        <b>Start:</b> {exampleText}
      </BodyShort>
      <BodyShort align="center">
        <b>Center:</b> {exampleText}
      </BodyShort>
      <BodyShort align="end">
        <b>End:</b> {exampleText}
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
  index: 5,
};
