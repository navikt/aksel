import "react";
import type { GlobalColorRoles } from "@navikt/ds-tokens/types";

declare module "react" {
  interface CSSProperties {
    [key: `--ac-${string}`]: string | number | undefined;
    [key: `--__ac-${string}`]: string | number | undefined;
    [key: `--axc-${string}`]: string | number | undefined;
    [key: `--__axc-${string}`]: string | number | undefined;
  }
  interface HTMLAttributes {
    "data-color-role"?: GlobalColorRoles;
  }
}
