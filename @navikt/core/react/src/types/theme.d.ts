/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { GlobalColorRoles } from "@navikt/ds-tokens/types";

/**
 * Interface for users to augment with their custom color names.
 * This allows for type-checking and autocompletion of custom colors
 * when using the \`data-color\` attribute.
 *
 * @example
 * \`\`\`ts
 * // Create a .d.ts file in your project (e.g., aksel-custom.d.ts)
 * // and ensure it's included in your tsconfig.json "include" array.
 *
 * declare module "@navikt/core/react/src/types/theme" {
 *   interface CustomAkselColors {
 *     "my-brand-primary": true;
 *     "project-specific-accent": true;
 *     // Add any other custom color names here.
 *     // The value (e.g., \`true\`) does not matter, only the key.
 *   }
 * }
 * \`\`\`
 */
// biome-ignore lint/suspicious/noEmptyInterface: Users will augment this interface
export interface CustomAkselColors {}

/**
 * Represents the available Aksel design system colors.
 * This type is a union of:
 * 1. Predefined \`GlobalColorRoles\` from \`@navikt/ds-tokens\`.
 * 2. Custom color names added by augmenting the \`CustomAkselColors\` interface.
 */
export type AkselColors = GlobalColorRoles | keyof CustomAkselColors;

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-color"?: AkselColors | (string & {});
    }
  }
}
