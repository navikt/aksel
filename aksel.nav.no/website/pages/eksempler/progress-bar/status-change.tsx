import React from "react";
import { InlineMessage, ProgressBar, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack width="300px" gap="space-8">
      <ProgressBar
        aria-labelledby="indeterminate-error"
        value={5}
        valueMax={7}
        data-color="danger"
      />
      <InlineMessage status="error" id="indeterminate-error">
        Noe gikk galt!
      </InlineMessage>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Du kan bruke 'data-color' for å endre farge på ProgressBar basert på status.",
};
