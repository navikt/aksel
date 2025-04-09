import { Box, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../../types/tokens";
import BreakpointToken from "./BreakpointToken";
import ColorToken from "./ColorToken";
import FontToken from "./FontToken";
import RadiusToken from "./RadiusToken";
import ShadowToken from "./ShadowToken";
import SpaceToken from "./SpaceToken";

const TokenExample = ({ token }: { token: TokenForDocumentationT }) => {
  switch (token.category) {
    case "backgroundColor":
    case "borderColor":
    case "textColor":
      return <ColorToken token={token} />;
    case "font":
      return <FontToken token={token} />;
    case "space":
      return <SpaceToken token={token} />;
    case "shadow":
      return <ShadowToken token={token} />;
    case "radius":
      return <RadiusToken token={token} />;
    case "breakpoint":
      return (
        <VStack as="div" align="center" justify="center" height="100%">
          <BreakpointToken token={token} />
        </VStack>
      );
    default:
      return (
        <Box.New
          borderColor="neutral-subtle"
          borderRadius="medium"
          background="neutral-moderate"
          borderWidth="1"
          width="32px"
          height="32px"
        />
      );
  }
};

const TokenPreview = ({ token }: { token: TokenForDocumentationT }) => (
  <Box.New
    background={
      token.category === "textColor" && token.modifier === "contrast"
        ? "neutral-moderate"
        : undefined
    }
    padding="3"
    borderColor="neutral-subtle"
    borderRadius="medium"
    borderWidth="1"
    height="58px"
    width="58px"
  >
    <TokenExample token={token} />
  </Box.New>
);

export default TokenPreview;
