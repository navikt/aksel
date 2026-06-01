import { Box, VStack } from "@navikt/ds-react";
import type { TokenDocT } from "@navikt/ds-tokens/token_docs";

const RadiusToken = ({ token }: { token: TokenDocT }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box
      as="div"
      width="32px"
      height="32px"
      background="neutral-strong"
      style={{
        borderRadius: token.cssValue,
      }}
    />
  </VStack>
);

export default RadiusToken;
