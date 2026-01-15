import { Box, Label, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText =
    "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

  return (
    <VStack gap="space-20">
      <h2>Default coloring</h2>
      <Label textColor="default">
        <b>Default:</b> {exampleText}
      </Label>
      <Label textColor="subtle">
        <b>Subtle:</b> {exampleText}
      </Label>
      <Box background="neutral-strong">
        <Label textColor="contrast">
          <b>Contrast:</b> {exampleText}
        </Label>
      </Box>
      <h2>Data-color</h2>
      <Label textColor="default" data-color="accent">
        <b>Default:</b> {exampleText}
      </Label>
      <Label textColor="subtle" data-color="accent">
        <b>Subtle:</b> {exampleText}
      </Label>
      <Box background="neutral-strong">
        <Label textColor="contrast" data-color="accent">
          <b>Contrast:</b> {exampleText}
        </Label>
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
  index: 2,
};
