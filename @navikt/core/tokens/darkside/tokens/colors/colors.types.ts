import type { GlobalColorScale } from "../../../internal-types";
import type { AkselColorRole } from "../../../types";
import { GlobalColorEntry } from "../../tokens.util";

export type GlobalConfigWithAlpha = Record<
  Extract<AkselColorRole, "neutral">,
  Record<GlobalColorScale, GlobalColorEntry>
> &
  Record<
    Exclude<AkselColorRole, "neutral">,
    Record<Exclude<GlobalColorScale, "000">, GlobalColorEntry>
  >;

export type GlobalConfigWithoutAlpha = Record<
  AkselColorRole,
  Record<
    Exclude<GlobalColorScale, "000" | "100A" | "200A" | "300A" | "400A">,
    GlobalColorEntry
  >
> & {
  neutral: {
    [key in Extract<GlobalColorScale, "000">]: GlobalColorEntry;
  };
};
