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

const spaceInPixels = [
  0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96,
  128,
] as const;

export { spaceInPixels };
export type { GlobalColorScale, GlobalColorKeys };
