import { Box, VStack } from "@navikt/ds-react";

const ShadowToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box.New
      borderRadius="medium"
      borderWidth="1"
      borderColor="neutral-subtle"
      width="32px"
      height="32px"
      style={{ boxShadow: token.value }}
    />
  </VStack>
);

export default ShadowToken;
