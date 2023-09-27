import { FontView } from "./categories/Font";
import { GlobalView } from "./categories/Global";
import { SemanticView } from "./categories/Semantic";
import { ShadowView } from "./categories/Shadow";
import { SpacingView } from "./categories/Spacing";
import { ZindexView } from "./categories/Zindex";
import { BreakpointsView } from "./categories/Breakpoints";
import { ShapesView } from "./categories/Shapes";

export default {
  title: "sanity-modules/Tokens",
  parameters: {
    layout: "fullscreen",
  },
};

export const FontViewDemo = () => <FontView cat="font" />;

export const GlobalViewDemo = () => <GlobalView cat="global-blue" />;

export const SemanticDefaultDemo = () => (
  <SemanticView cat="semantic-surface-default" />
);

export const SemanticActionDemo = () => (
  <SemanticView cat="semantic-surface-action" />
);

export const SemanticNeutralDemo = () => (
  <SemanticView cat="semantic-surface-neutral" />
);

export const SemanticSuccessDemo = () => (
  <SemanticView cat="semantic-surface-success" />
);

export const SemanticDangerDemo = () => (
  <SemanticView cat="semantic-surface-danger" />
);

export const SemanticWarningDemo = () => (
  <SemanticView cat="semantic-surface-warning" />
);

export const SemanticInfoDemo = () => (
  <SemanticView cat="semantic-surface-info" />
);

export const SemanticAltDemo = () => (
  <SemanticView cat="semantic-surface-alt" />
);

export const SemanticBorderDefault = () => (
  <SemanticView cat="semantic-border-default" />
);
export const SemanticBorderAction = () => (
  <SemanticView cat="semantic-border-action" />
);
export const SemanticBorderStatus = () => (
  <SemanticView cat="semantic-border-status" />
);
export const SemanticBorderFocus = () => (
  <SemanticView cat="semantic-border-focus" />
);
export const SemanticBorderAlt = () => (
  <SemanticView cat="semantic-border-alt" />
);

export const SemanticIconDefault = () => (
  <SemanticView cat="semantic-icon-default" />
);
export const SemanticIconAction = () => (
  <SemanticView cat="semantic-icon-action" />
);
export const SemanticIconStatus = () => (
  <SemanticView cat="semantic-icon-status" />
);
export const SemanticIconAlt = () => <SemanticView cat="semantic-icon-alt" />;

export const SemanticTextView = () => <SemanticView cat="semantic-text" />;

export const RadiusViewDemo = () => <ShapesView cat="radius" />;

export const ShadowViewDemo = () => <ShadowView cat="shadow" />;

export const SpacingViewDemo = () => <SpacingView cat="spacing" />;

export const IndexView = () => <ZindexView cat="z-index" />;

export const BreakpointView = () => <BreakpointsView cat="breakpoints" />;
