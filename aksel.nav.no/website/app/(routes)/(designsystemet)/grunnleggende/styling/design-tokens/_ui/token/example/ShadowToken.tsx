import { Box, VStack } from "@navikt/ds-react";
import type { TokenDocT } from "@navikt/ds-tokens/token_docs";

const ShadowToken = ({ token }: { token: TokenDocT }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box
      borderRadius="4"
      borderWidth="1"
      borderColor="neutral-subtle"
      width="32px"
      height="32px"
      style={{ boxShadow: token.cssValue }}
    />
  </VStack>
);

export default ShadowToken;
