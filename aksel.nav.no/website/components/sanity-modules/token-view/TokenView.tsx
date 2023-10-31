import ErrorBoundary from "@/error-boundary";
import { BreakpointsView } from "./parts/categories/Breakpoints";
import { FontView } from "./parts/categories/Font";
import { GlobalView } from "./parts/categories/Global";
import { SemanticView } from "./parts/categories/Semantic";
import { ShadowView } from "./parts/categories/Shadow";
import { ShapesView } from "./parts/categories/Shapes";
import { SpacingView } from "./parts/categories/Spacing";
import { ZindexView } from "./parts/categories/Zindex";

type TokenViewProps = {
  token: {
    title: string;
    kategori: string;
  };
};

const TokenView = ({ token }: TokenViewProps) => {
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

export default function Component(props: TokenViewProps) {
  return (
    <ErrorBoundary boundaryName="TokenView">
      <TokenView {...props} />
    </ErrorBoundary>
  );
}
