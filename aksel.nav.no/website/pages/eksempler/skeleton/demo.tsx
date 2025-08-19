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
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "I de fleste tilfellene vil du bruke 'width' og 'height' for å manuelt bygge opp en visuell representasjon av elementet du skal emulere. Disse settes da rett på style, slik at px, rem eller f.eks. '100%' fungerer.",
};
