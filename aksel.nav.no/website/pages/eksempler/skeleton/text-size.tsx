import { Heading, Skeleton, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8">
      <Skeleton variant="text" width="100%" />
      {/* 'as'-prop kan brukes på all typografien vår med Skeleton */}
      <Heading as={Skeleton} size="xlarge" width="100%">
        Placeholder
      </Heading>
      <div style={{ fontSize: "5rem" }}>
        <Skeleton variant="text" width="100%" />
      </div>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = { render: Example };

export const args = {
  index: 2,
  desc: "Med `variant='text'` følger høyden skriftstørrelsen.",
};
