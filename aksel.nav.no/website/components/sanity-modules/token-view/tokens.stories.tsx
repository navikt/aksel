import { FontView } from "./categories/Font";
import { GlobalView } from "./categories/Global";
import { SemanticView } from "./categories/Semantic";
import { ShadowView } from "./categories/Shadow";
import { SpacingView } from "./categories/Spacing";
import { ZindexView } from "./categories/Zindex";
import { BreakpointsView } from "./categories/Breakpoints";
import "../../../dist/tw.css";
export default {
  title: "sanity-modules/tokenview",
  parameters: {
    layout: "fullscreen",
  },
};

export const FontViewDemo = () => <FontView cat="font" />;

export const GlobalViewDemo = () => <GlobalView cat="global-blue" />;

export const SemanticViewDemo = () => <SemanticView cat="semantic-surface" />;

export const SemanticBorderView = () => <SemanticView cat="semantic-border" />;

export const SemanticIconView = () => <SemanticView cat="semantic-icon" />;

export const SemanticTextView = () => <SemanticView cat="semantic-text" />;

export const RadiusView = () => <SemanticView cat="semantic-radius" />;

export const ShadowViewDemo = () => <ShadowView cat="shadow" />;

export const SpacingViewDemo = () => <SpacingView cat="spacing" />;

export const IndexView = () => <ZindexView cat="z-index" />;

export const BreakpointView = () => <BreakpointsView cat="breakpoints" />;
