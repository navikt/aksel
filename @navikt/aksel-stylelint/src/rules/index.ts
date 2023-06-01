import { Rule } from "stylelint";
import designTokenExists from "./aksel-design-token-exists";
import internalTokens from "./aksel-no-internal-tokens";
import classOverride from "./aksel-no-class-override";
import deprecatedClasses from "./aksel-no-deprecated-classes";
import noGlobalOverride from "./aksel-design-token-no-global-override";
import noComponentReference from "./aksel-design-token-no-component-reference";

export const rules: Record<string, Rule> = {
  "aksel/design-token-exists": designTokenExists,
  "aksel/design-token-no-global-override": noGlobalOverride,
  "aksel/design-token-no-component-reference": noComponentReference,
  "aksel/no-internal-tokens": internalTokens,
  "aksel/no-class-override": classOverride,
  "aksel/no-deprecated-classes": deprecatedClasses,
};
