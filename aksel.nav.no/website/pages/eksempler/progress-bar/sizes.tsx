import { ProgressBar, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <p id="progress-bar-label-small">Fremdrift i søknaden (liten versjon)</p>
      <ProgressBar
        value={1}
        valueMax={12}
        size="small"
        aria-labelledby="progress-bar-label-small"
      />

      <p id="progress-bar-label-medium">
        Fremdrift i søknaden (medium versjon)
      </p>
      <ProgressBar
        value={6}
        valueMax={12}
        size="medium"
        aria-labelledby="progress-bar-label-medium"
      />

      <p id="progress-bar-label-large">Fremdrift i søknaden (stor versjon)</p>
      <ProgressBar
        value={11}
        valueMax={12}
        size="large"
        aria-labelledby="progress-bar-label-large"
      />
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
  index: 0,
};
