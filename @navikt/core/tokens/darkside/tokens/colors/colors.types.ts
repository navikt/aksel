import { AkselColors, GlobalColorScale } from "../../../types";
import { GlobalColorEntry } from "../../tokens.util";

export type GlobalConfigWithAlpha = Record<
  Extract<AkselColors, "neutral">,
  Record<GlobalColorScale, GlobalColorEntry>
> &
  Record<
    Exclude<AkselColors, "neutral">,
    Record<Exclude<GlobalColorScale, "000">, GlobalColorEntry>
  >;

export type GlobalConfigWithoutAlpha = Record<
  AkselColors,
  Record<
    Exclude<GlobalColorScale, "000" | "100A" | "200A" | "300A" | "400A">,
    GlobalColorEntry
  >
> & {
  neutral: {
    [key in Extract<GlobalColorScale, "000">]: GlobalColorEntry;
  };
};
