import { Box, Skeleton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box padding="6" borderRadius="large" shadow="xsmall" width="14rem">
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { legacyOnly: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
