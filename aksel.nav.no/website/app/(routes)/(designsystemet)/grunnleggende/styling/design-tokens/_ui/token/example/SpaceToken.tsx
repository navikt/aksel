import { SpaceHorizontalIcon } from "@navikt/aksel-icons";
import { VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../types";

const SpaceToken = ({ token }: { token: TokenForDocumentationT }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <SpaceHorizontalIcon
      title={token.name}
      color={token.cssValue}
      fontSize="var(--ax-font-size-heading-medium)"
    />
  </VStack>
);

export default SpaceToken;
