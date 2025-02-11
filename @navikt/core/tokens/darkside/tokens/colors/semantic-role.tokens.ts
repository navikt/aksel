import _ from "lodash";
import { type SemanticColorRoles } from "../../../types";
import { ColorRolesList } from "../../../types";
import { type StyleDictionaryTokenConfig } from "../../tokens.util";

/**
 * Maps the semantic colors to the global color layer for a given role.
 * @note Gray is handled a little differently, as it is visually perceived a little lighter than other colors.
 */
export function semanticTokensForRole(role: SemanticColorRoles) {
  return {
    bg: {
      [`${role}-soft`]: {
        value: `{ax.${role}.100.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-softA`]: {
        value: `{ax.${role}.100A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate`]: {
        value: `{ax.${role}.200.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderateA`]: {
        value: `{ax.${role}.200A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-hover`]: {
        value: `{ax.${role}.300.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-hoverA`]: {
        value: `{ax.${role}.300A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-pressed`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-pressedA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.700.value}`
            : `{ax.${role}.600.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong-hover`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.800.value}`
            : `{ax.${role}.700.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong-pressed`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.900.value}`
            : `{ax.${role}.800.value}`,
        type: "color",
        group: `background.${role}`,
      },
    },
    text: {
      [role]: {
        value: `{ax.${role}.1000.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-subtle`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.900.value}`
            : `{ax.${role}.800.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-icon`]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-contrast`]: {
        value: "{ax.neutral.000.value}",
        type: "color",
        group: `text.${role}`,
      },
    },
    border: {
      [role]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-subtle`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-subtleA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.700.value}`,
        type: "color",
        group: `border.${role}`,
      },
    },
  } satisfies StyleDictionaryTokenConfig<"color">;
}

export const themedConfigForRole = (role: SemanticColorRoles) => {
  return {
    bg: {
      soft: {
        value: `{ax.bg.${role}-soft.value}`,
        type: "themed-role",
      },
      softA: {
        value: `{ax.bg.${role}-softA.value}`,
        type: "themed-role",
      },
      moderate: {
        value: `{ax.bg.${role}-moderate.value}`,
        type: "themed-role",
      },
      moderateA: {
        value: `{ax.bg.${role}-moderateA.value}`,
        type: "themed-role",
      },
      "moderate-hover": {
        value: `{ax.bg.${role}-moderate-hover.value}`,
        type: "themed-role",
      },
      "moderate-hoverA": {
        value: `{ax.bg.${role}-moderate-hoverA.value}`,
        type: "themed-role",
      },
      "moderate-pressed": {
        value: `{ax.bg.${role}-moderate-pressed.value}`,
        type: "themed-role",
      },
      "moderate-pressedA": {
        value: `{ax.bg.${role}-moderate-pressedA.value}`,
        type: "themed-role",
      },
      strong: {
        value: `{ax.bg.${role}-strong.value}`,
        type: "themed-role",
      },
      "strong-hover": {
        value: `{ax.bg.${role}-strong-hover.value}`,
        type: "themed-role",
      },
      "strong-pressed": {
        value: `{ax.bg.${role}-strong-pressed.value}`,
        type: "themed-role",
      },
    },
    text: {
      default: {
        value: `{ax.text.${role}.value}`,
        type: "themed-role",
      },
      subtle: {
        value: `{ax.text.${role}-subtle.value}`,
        type: "themed-role",
      },
      icon: {
        value: `{ax.text.${role}-icon.value}`,
        type: "themed-role",
      },
    },
    border: {
      default: {
        value: `{ax.border.${role}.value}`,
        type: "themed-role",
      },
      subtle: {
        value: `{ax.border.${role}-subtle.value}`,
        type: "themed-role",
      },
      subtleA: {
        value: `{ax.border.${role}-subtleA.value}`,
        type: "themed-role",
      },
      strong: {
        value: `{ax.border.${role}-strong.value}`,
        type: "themed-role",
      },
    },
  };
};

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRoles = () => {
  return ColorRolesList.reduce(
    (acc, role) => _.merge(acc, semanticTokensForRole(role)),
    {} as ReturnType<typeof semanticTokensForRole>,
  );
};
