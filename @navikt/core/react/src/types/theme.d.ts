/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AkselColorRole } from "@navikt/ds-tokens/types";

// biome-ignore lint/suspicious/noEmptyInterface: Users can/will augment this interface
export interface CustomAkselColor {}

export type AkselColor =
  | AkselColorRole
  | keyof CustomAkselColor
  | (string & {});

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-color"?: AkselColor | (string & {});
    }
  }
}
