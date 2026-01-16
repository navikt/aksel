import { Box, Detail, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <VStack gap="space-20">
      <h2>Default coloring</h2>
      <Detail textColor="default">
        <b>Default:</b> {exampleText}
      </Detail>
      <Detail textColor="subtle">
        <b>Subtle:</b> {exampleText}
      </Detail>
      <Box background="neutral-strong">
        <Detail textColor="contrast">
          <b>Contrast:</b> {exampleText}
        </Detail>
      </Box>
      <h2>Data-color</h2>
      <Detail textColor="default" data-color="accent">
        <b>Default:</b> {exampleText}
      </Detail>
      <Detail textColor="subtle" data-color="accent">
        <b>Subtle:</b> {exampleText}
      </Detail>
      <Box background="neutral-strong">
        <Detail textColor="contrast" data-color="accent">
          <b>Contrast:</b> {exampleText}
        </Detail>
      </Box>
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
