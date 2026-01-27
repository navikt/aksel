import { Box, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../types";
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
      console.warn("Unknown token category", token);
      return (
        <Box
          borderColor="neutral-subtle"
          borderRadius="4"
          background="neutral-moderate"
          borderWidth="1"
          width="32px"
          height="32px"
          className="vk-error"
        />
      );
  }
};

const TokenPreview = ({ token }: { token: TokenForDocumentationT }) => (
  <Box
    aria-hidden="true"
    background={
      token.category === "textColor" && token.modifier === "contrast"
        ? "neutral-strong"
        : undefined
    }
    padding="space-12"
    borderColor="neutral-subtle"
    borderRadius="8"
    borderWidth="1"
    height="58px"
    width="58px"
    style={
      token.rawValue.startsWith("#") && token.rawValue.length === 9
        ? {
            backgroundColor: "transparent",
            opacity: 0.8,
            backgroundImage: `repeating-linear-gradient(45deg, var(--ax-bg-neutral-moderate) 25%, transparent 25%, transparent 75%, var(--ax-bg-neutral-moderate) 75%, var(--ax-bg-neutral-moderate)),
              repeating-linear-gradient(45deg, var(--ax-bg-neutral-moderate) 25%, transparent 25%, transparent 75%, var(--ax-bg-neutral-moderate) 75%, var(--ax-bg-neutral-moderate))`,
            backgroundPosition: "-4px -4px, 4px 4px",
            backgroundSize: "16px 16px",
            backgroundRepeat: "repeat",
          }
        : undefined
    }
  >
    <TokenExample token={token} />
  </Box>
);

export default TokenPreview;
