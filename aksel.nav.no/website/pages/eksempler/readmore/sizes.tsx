import { ReadMore, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16" align="center">
      <ReadMore
        size="large"
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
      >
        lorem ipsum
      </ReadMore>
      <ReadMore
        size="medium"
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
      >
        lorem ipsum
      </ReadMore>
      <ReadMore
        size="small"
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
      >
        lorem ipsum
      </ReadMore>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
