import { withErrorBoundary } from "@/error-boundary";
import { BreakpointsView } from "./categories/Breakpoints";
import { FontView } from "./categories/Font";
import { GlobalView } from "./categories/Global";
import { SemanticView } from "./categories/Semantic";
import { ShadowView } from "./categories/Shadow";
import { ShapesView } from "./categories/Shapes";
import { SpacingView } from "./categories/Spacing";
import { ZindexView } from "./categories/Zindex";

const TokenView = ({
  token,
}: {
  token: { title: string; kategori: string };
}) => {
  switch (true) {
    case token.title === "font":
      return <FontView cat={token.title} />;
    case token.title.startsWith("global"):
      return <GlobalView cat={token.title} />;
    case token.title.startsWith("semantic"):
      return <SemanticView cat={token.title} />;
    case token.title === "radius":
      return <ShapesView cat={token.title} />;
    case token.title === "shadow":
      return <ShadowView cat={token.title} />;
    case token.title === "spacing":
      return <SpacingView cat={token.title} />;
    case token.title === "z-index":
      return <ZindexView cat={token.title} />;
    case token.title === "breakpoints":
      return <BreakpointsView cat={token.title} />;
    default:
      return null;
  }
};

export default withErrorBoundary(TokenView, "TokenView");
