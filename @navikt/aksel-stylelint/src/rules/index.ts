import { Rule } from "stylelint";
import designTokenExists from "./aksel-design-token-exists/index.js";
import noGlobalOverride from "./aksel-design-token-no-global-override/index.js";
import classOverride from "./aksel-no-class-override/index.js";
import deprecatedClasses from "./aksel-no-deprecated-classes/index.js";
import internalTokens from "./aksel-no-internal-tokens/index.js";
import noLegacyClasses from "./aksel-no-legacy-classes/index.js";

export const rules: Record<string, Rule> = {
  "aksel/design-token-exists": designTokenExists,
  "aksel/design-token-no-global-override": noGlobalOverride,
  "aksel/no-internal-tokens": internalTokens,
  "aksel/no-class-override": classOverride,
  "aksel/no-deprecated-classes": deprecatedClasses,
  "aksel/no-legacy-classes": noLegacyClasses,
};
