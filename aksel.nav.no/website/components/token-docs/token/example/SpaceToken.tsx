import { SpaceHorizontalIcon } from "@navikt/aksel-icons";
import { VStack } from "@navikt/ds-react";

const SpaceToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <SpaceHorizontalIcon
      title={token.name}
      color={token.value}
      fontSize="1.5rem"
    />
  </VStack>
);

export default SpaceToken;
