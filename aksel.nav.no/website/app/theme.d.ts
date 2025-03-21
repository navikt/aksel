import "react";
import type { GlobalColorRoles } from "@navikt/ds-tokens/types";

type AkselBrandColors =
  | "aksel-brand-teal"
  | "aksel-brand-violet"
  | "aksel-brand-pink";

declare module "react" {
  interface HTMLAttributes {
    "data-color-role"?: GlobalColorRoles | AkselBrandColors;
    "data-block-margin"?: "space-28";
  }
}
