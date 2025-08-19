import { BodyLong, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampleText =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return (
    <VStack gap="space-20">
      <BodyLong size="small">
        <b>Small (16px):</b> {exampleText}
      </BodyLong>
      <BodyLong size="medium">
        <b>Medium (default, 18px):</b> {exampleText}
      </BodyLong>
      <BodyLong size="large">
        <b>Large (20px):</b> {exampleText}
      </BodyLong>
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
  index: 0,
};
