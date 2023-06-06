import TokenView from "./index";
import "../../../dist/tw.css";
export default {
  title: "sanity-modules/tokenview",
  parameters: {
    layout: "fullscreen",
  },
};

export const FontView = () => (
  <TokenView token={{ title: "font", kategori: "test" }} />
);

export const GlobalView = () => (
  <TokenView token={{ title: "global-blue", kategori: "test" }} />
);

export const SemanticView = () => (
  <TokenView token={{ title: "semantic-surface", kategori: "test" }} />
);

export const SemanticBorderView = () => (
  <TokenView token={{ title: "semantic-border", kategori: "test" }} />
);

export const SemanticIconView = () => (
  <TokenView token={{ title: "semantic-icon", kategori: "test" }} />
);

export const SemanticTextView = () => (
  <TokenView token={{ title: "semantic-text", kategori: "test" }} />
);

export const RadiusView = () => (
  <TokenView token={{ title: "radius", kategori: "test" }} />
);

export const ShadowView = () => (
  <TokenView token={{ title: "shadow", kategori: "test" }} />
);

export const SpacingView = () => (
  <TokenView token={{ title: "spacing", kategori: "test" }} />
);

export const IndexView = () => (
  <TokenView token={{ title: "z-index", kategori: "test" }} />
);

export const BreakpointView = () => (
  <TokenView token={{ title: "breakpoints", kategori: "test" }} />
);
