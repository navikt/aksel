import type { AkselColorRole } from "../../../types";

/**
 * This utility sets the semantic "role"-tokens for a given color role on the "base"-layer.
 * This allows us themable to create themable CSS in this format:
 * @example
 * ```css
 * [data-color="accent"] {
 *   --ax-bg-soft: var(--ax-bg-accent-soft);
 *   --ax-bg-softA: var(--ax-bg-accent-softA);
 *   --ax-bg-moderate: var(--ax-bg-accent-moderate);
 * }
 *
 * [data-color="success"] {
 *   --ax-bg-soft: var(--ax-bg-success-soft);
 *   --ax-bg-softA: var(--ax-bg-success-softA);
 *   --ax-bg-moderate: var(--ax-bg-success-moderate);
 * }
 * ```
 */
export function semanticThemedBaseTokens(role: AkselColorRole) {
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
      decoration: {
        value: `{ax.text.${role}-decoration.value}`,
        type: "themed-role",
      },
      contrast: {
        value: `{ax.text.${role}-contrast.value}`,
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
}
