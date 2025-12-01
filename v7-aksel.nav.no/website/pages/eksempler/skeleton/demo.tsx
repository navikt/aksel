import { Box, Heading, Skeleton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      {loaded ? (
        <span>Loaded</span>
      ) : (
        <Box width="12rem">
          <Skeleton variant="circle" width={80} height={80} />
          <Heading as={Skeleton} size="large">
            Card-title
          </Heading>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </Box>
      )}
    </>
  );
};

const loaded = false;

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = { render: Example };

export const args = {
  index: 0,
  desc: "Du kan enten wrappe elementet som skal emuleres, eller sette størrelsen manuelt med prop-ene `width` og `height`. Width og height settes rett på style, slik at px, rem eller f.eks. '100%' fungerer.",
};
