import { Rule } from "stylelint";
import testRule from "./aksel-test-rule";
import designTokens from "./aksel-design-tokens";

export const rules: Record<string, Rule> = {
  "aksel-test-rule": testRule,
  "aksel-design-tokens": designTokens,
};
