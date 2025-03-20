import { Box, VStack } from "@navikt/ds-react";

const RadiusToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box
      as="div"
      width="32px"
      height="32px"
      background="surface-neutral"
      style={{
        borderRadius: token.value,
      }}
    />
  </VStack>
);

export default RadiusToken;
