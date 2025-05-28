import { AkselColors } from "./types";

type GlobalColorScale =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "1000"
  | "000"
  | "100A"
  | "200A"
  | "300A"
  | "400A";

type GlobalColorKeys =
  | `${Extract<AkselColors, "neutral">}-${Extract<GlobalColorScale, "000">}`
  | `${AkselColors}-${Exclude<GlobalColorScale, "000">}`;

export type { GlobalColorScale, GlobalColorKeys };
