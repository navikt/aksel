import { Box, VStack } from "@navikt/ds-react";
import BreakpointToken from "./BreakpointToken";
import ColorToken from "./ColorToken";
import FontToken from "./FontToken";
import RadiusToken from "./RadiusToken";
import ShadowToken from "./ShadowToken";
import SpaceToken from "./SpaceToken";

const TokenExample = ({ token }: { token: any }) => {
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
        <Box
          borderColor="border-subtle"
          borderRadius="medium"
          background="bg-default"
          borderWidth="1"
          width="32px"
          height="32px"
        />
      );
  }
};

const TokenPreview = ({ token }: { token: any }) => (
  <Box
    background={
      token.category === "textColor" && token.modifier === "contrast"
        ? "surface-neutral"
        : undefined
    }
    padding="3"
    borderColor="border-subtle"
    borderRadius="medium"
    borderWidth="1"
    height="58px"
    width="58px"
  >
    <TokenExample token={token} />
  </Box>
);

export default TokenPreview;
