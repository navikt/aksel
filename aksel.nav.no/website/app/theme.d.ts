import "react";
import type {} from "@navikt/core/react/types/theme";

/**
 * @example
 * ```tsx
 * import type { AkselColor } from "@navikt/ds-react/types/theme";
 *
 * interface MyComponentProps {
 *   color: AkselColor;
 * }
 *
 * const MyComponent = ({ color }: MyComponentProps) => {
 *  return <div data-color={color}>Hello World</div>;
 *};
 * // Valid usage:
 * const component1 = <MyComponent color="danger" />; // Predefined color
 * const component2 = <MyComponent color="my-brand-primary" />; // Custom color
 * const component3 = <MyComponent color="project-specific-accent" />; // Custom color
 *
 * // Invalid usage (TypeScript will error if tsconfig is set up correctly):
 * // const component4 = <MyComponent color="non-existent-color" />;
 * ```
 */
declare module "@navikt/ds-react/types/theme" {
  export interface CustomAkselColor {
    "aksel-brand-teal": never;
    "aksel-brand-pink": never;
  }
}

declare module "react" {
  interface HTMLAttributes {
    /**
     * Standarized margin for PortableText blocks.
     */
    "data-block-margin"?: "space-28" | "space-0";
    /**
     * When set, the element will be rendered with a max-width made for prose text.
     */
    "data-text-prose"?: boolean;
    /**
     * When set, adds branded colors to the heading.
     */
    "data-aksel-heading-color"?: boolean;
    /**
     * Adds line-clamping to the text.
     */
    "data-clamp-text"?: "4-lines";
  }
}
