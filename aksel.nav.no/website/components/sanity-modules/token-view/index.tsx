import { withErrorBoundary } from "@/error-boundary";
import { CopyProvider } from "./CopyTokenv2";
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
      return (
        <CopyProvider>
          <FontView cat={token.title} />
        </CopyProvider>
      );
    case token.title.startsWith("global"):
      return (
        <CopyProvider>
          <GlobalView cat={token.title} />
        </CopyProvider>
      );
    case token.title.startsWith("semantic"):
      return (
        <CopyProvider>
          <SemanticView cat={token.title} />
        </CopyProvider>
      );
    case token.title === "radius":
      return (
        <CopyProvider>
          <ShapesView cat={token.title} />
        </CopyProvider>
      );
    case token.title === "shadow":
      return (
        <CopyProvider>
          <ShadowView cat={token.title} />
        </CopyProvider>
      );
    case token.title === "spacing":
      return (
        <CopyProvider>
          <SpacingView cat={token.title} />
        </CopyProvider>
      );
    case token.title === "z-index":
      return (
        <CopyProvider>
          <ZindexView cat={token.title} />
        </CopyProvider>
      );
    default:
      return null;
  }
};

export default withErrorBoundary(TokenView, "TokenView");
