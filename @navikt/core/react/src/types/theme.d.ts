/* oxlint-disable typescript/no-empty-object-type */
import type { AkselColorRole } from "@navikt/ds-tokens/types";

/* Users can/will augment this interface */
export interface CustomAkselColor {}

export type AkselColor = AkselColorRole | keyof CustomAkselColor;

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-color"?: AkselColor;
    }
  }
}
