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
        comment: "TODO: Sjur fyller ut",
      },
      softA: {
        value: `{ax.bg.${role}-softA.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      moderate: {
        value: `{ax.bg.${role}-moderate.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      moderateA: {
        value: `{ax.bg.${role}-moderateA.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "moderate-hover": {
        value: `{ax.bg.${role}-moderate-hover.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "moderate-hoverA": {
        value: `{ax.bg.${role}-moderate-hoverA.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "moderate-pressed": {
        value: `{ax.bg.${role}-moderate-pressed.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "moderate-pressedA": {
        value: `{ax.bg.${role}-moderate-pressedA.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      strong: {
        value: `{ax.bg.${role}-strong.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "strong-hover": {
        value: `{ax.bg.${role}-strong-hover.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      "strong-pressed": {
        value: `{ax.bg.${role}-strong-pressed.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
    },
    text: {
      default: {
        value: `{ax.text.${role}.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      subtle: {
        value: `{ax.text.${role}-subtle.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      decoration: {
        value: `{ax.text.${role}-decoration.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      contrast: {
        value: `{ax.text.${role}-contrast.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
    },
    border: {
      default: {
        value: `{ax.border.${role}.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      subtle: {
        value: `{ax.border.${role}-subtle.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      subtleA: {
        value: `{ax.border.${role}-subtleA.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
      strong: {
        value: `{ax.border.${role}-strong.value}`,
        type: "themed-role",
        comment: "TODO: Sjur fyller ut",
      },
    },
  };
}
