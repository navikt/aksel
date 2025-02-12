import { GlobalColorRoles, GlobalColorScale } from "../../../types";
import { GlobalColorEntry } from "../../tokens.util";

export type GlobalConfigWithAlpha = Record<
  Extract<GlobalColorRoles, "neutral">,
  Record<GlobalColorScale, GlobalColorEntry>
> &
  Record<
    Exclude<GlobalColorRoles, "neutral">,
    Record<Exclude<GlobalColorScale, "000">, GlobalColorEntry>
  >;

export type GlobalConfigWithoutAlpha = Record<
  GlobalColorRoles,
  Record<
    Exclude<GlobalColorScale, "000" | "100A" | "200A" | "300A" | "400A">,
    GlobalColorEntry
  >
> & {
  neutral: {
    [key in Extract<GlobalColorScale, "000">]: GlobalColorEntry;
  };
};
