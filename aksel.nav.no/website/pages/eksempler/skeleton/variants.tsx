import { Skeleton, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8" width="12rem">
      {/* variant="text" kan endre størelse med justering av font-size */}
      <Skeleton variant="text" width="60%" />
      {/* For alle andre varianter må width og height brukes */}
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="rectangle" width="100%" height={30} />
      <Skeleton variant="rounded" width="100%" height={40} />
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
  index: 1,
  desc: "'text' (standard) representerer en enkel linje med tekst. 'circle', 'rectangle' og 'rounded' gir forskjellig visuell representasjon av elementet.",
};
