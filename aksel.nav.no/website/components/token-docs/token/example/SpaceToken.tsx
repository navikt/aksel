import { SpaceHorizontalIcon } from "@navikt/aksel-icons";
import { VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../../types/tokens";

const SpaceToken = ({ token }: { token: TokenForDocumentationT }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <SpaceHorizontalIcon
      title={token.name}
      color={token.value}
      fontSize="1.5rem"
    />
  </VStack>
);

export default SpaceToken;
