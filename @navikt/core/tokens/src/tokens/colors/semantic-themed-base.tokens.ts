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
        value: `{ax.bg.${role}-soft}`,
        type: "themed-role",
      },
      softA: {
        value: `{ax.bg.${role}-softA}`,
        type: "themed-role",
      },
      moderate: {
        value: `{ax.bg.${role}-moderate}`,
        type: "themed-role",
      },
      moderateA: {
        value: `{ax.bg.${role}-moderateA}`,
        type: "themed-role",
      },
      "moderate-hover": {
        value: `{ax.bg.${role}-moderate-hover}`,
        type: "themed-role",
      },
      "moderate-hoverA": {
        value: `{ax.bg.${role}-moderate-hoverA}`,
        type: "themed-role",
      },
      "moderate-pressed": {
        value: `{ax.bg.${role}-moderate-pressed}`,
        type: "themed-role",
      },
      "moderate-pressedA": {
        value: `{ax.bg.${role}-moderate-pressedA}`,
        type: "themed-role",
      },
      strong: {
        value: `{ax.bg.${role}-strong}`,
        type: "themed-role",
      },
      "strong-hover": {
        value: `{ax.bg.${role}-strong-hover}`,
        type: "themed-role",
      },
      "strong-pressed": {
        value: `{ax.bg.${role}-strong-pressed}`,
        type: "themed-role",
      },
    },
    text: {
      default: {
        value: `{ax.text.${role}}`,
        type: "themed-role",
      },
      subtle: {
        value: `{ax.text.${role}-subtle}`,
        type: "themed-role",
      },
      decoration: {
        value: `{ax.text.${role}-decoration}`,
        type: "themed-role",
      },
      contrast: {
        value: `{ax.text.${role}-contrast}`,
        type: "themed-role",
      },
    },
    border: {
      default: {
        value: `{ax.border.${role}}`,
        type: "themed-role",
      },
      subtle: {
        value: `{ax.border.${role}-subtle}`,
        type: "themed-role",
      },
      subtleA: {
        value: `{ax.border.${role}-subtleA}`,
        type: "themed-role",
      },
      strong: {
        value: `{ax.border.${role}-strong}`,
        type: "themed-role",
      },
    },
  };
}
