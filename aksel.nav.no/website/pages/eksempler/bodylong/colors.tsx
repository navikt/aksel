import { BodyLong, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="space-20">
      <h2>Default coloring</h2>
      <BodyLong textColor="default">
        <b>Default:</b> {exampleText}
      </BodyLong>
      <BodyLong textColor="subtle">
        <b>Subtle:</b> {exampleText}
      </BodyLong>
      <Box background="neutral-strong">
        <BodyLong textColor="contrast">
          <b>Contrast:</b> {exampleText}
        </BodyLong>
      </Box>
      <h2>Data-color</h2>
      <BodyLong textColor="default" data-color="accent">
        <b>Default:</b> {exampleText}
      </BodyLong>
      <BodyLong textColor="subtle" data-color="accent">
        <b>Subtle:</b> {exampleText}
      </BodyLong>
      <Box background="neutral-strong">
        <BodyLong textColor="contrast" data-color="accent">
          <b>Contrast:</b> {exampleText}
        </BodyLong>
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
