import { Box, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../types";

const ShadowToken = ({ token }: { token: TokenForDocumentationT }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box.New
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
