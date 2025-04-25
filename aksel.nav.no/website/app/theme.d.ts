import "react";
import type { GlobalColorRoles } from "@navikt/ds-tokens/types";

type AkselBrandColors = "aksel-brand-teal" | "aksel-brand-pink";

declare module "react" {
  interface HTMLAttributes {
    "data-color-role"?: GlobalColorRoles | AkselBrandColors;
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
  }
}
