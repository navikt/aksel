import { Rule } from "stylelint";
import designTokenExists from "./aksel-design-token-exists";

export const rules: Record<string, Rule> = {
  "aksel-design-token-exists": designTokenExists,
};
