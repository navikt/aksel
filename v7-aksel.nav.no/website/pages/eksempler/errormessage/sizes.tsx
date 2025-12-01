import { ErrorMessage, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const exampeText = "Du må fylle ut tekstfeltet før innsending.";

  return (
    <VStack gap="space-20">
      <ErrorMessage>Medium (18px): {exampeText}</ErrorMessage>
      <ErrorMessage size="small">Small (16px): {exampeText}</ErrorMessage>
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
