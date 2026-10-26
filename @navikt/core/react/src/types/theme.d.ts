/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AkselColorRole } from "@navikt/ds-tokens/types";

export interface CustomAkselColor {}

export type AkselColor = AkselColorRole | keyof CustomAkselColor;

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-color"?: AkselColor;
    }
  }
}
