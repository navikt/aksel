import { Rule } from "stylelint";
import designTokens from "./aksel-design-tokens";

export const rules: Record<string, Rule> = {
  "aksel-design-tokens": designTokens,
};
