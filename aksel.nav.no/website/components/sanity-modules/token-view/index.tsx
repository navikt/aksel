import { GlobalView } from "./categories/Global";
import { SemanticView } from "./categories/Semantic";
import { ShadowView } from "./categories/Shadow";
import { SpacingView } from "./categories/Spacing";
import { ShapesView } from "./categories/Shapes";
import { ZindexView } from "./categories/Zindex";
import { FontView } from "./categories/Font";

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
    default:
      return null;
  }
};

export default TokenView;
