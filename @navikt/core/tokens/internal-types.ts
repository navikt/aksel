import { AkselColorRole, AkselSpaceToken } from "./types";

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
  | `${Extract<AkselColorRole, "neutral">}-${Extract<GlobalColorScale, "000">}`
  | `${AkselColorRole}-${Exclude<GlobalColorScale, "000">}`;

type ExtractNumber<T> = T extends `space-${infer N extends number}` ? N : never;

const spaceObject: Record<ExtractNumber<AkselSpaceToken>, any> = {
  "0": "",
  "1": "",
  "2": "",
  "4": "",
  "6": "",
  "8": "",
  "12": "",
  "16": "",
  "20": "",
  "24": "",
  "28": "",
  "32": "",
  "36": "",
  "40": "",
  "44": "",
  "48": "",
  "56": "",
  "64": "",
  "72": "",
  "80": "",
  "96": "",
  "128": "",
};

const spaceInPixels = Object.keys(spaceObject).map(Number);

/* ------------------------------ Font tokens ------------------------------- */
type FontFamilyKeys = "family";

type FontSizeKeys =
  | "size-heading-2xlarge"
  | "size-heading-xlarge"
  | "size-heading-large"
  | "size-heading-medium"
  | "size-heading-small"
  | "size-heading-xsmall"
  | "size-xlarge"
  | "size-large"
  | "size-medium"
  | "size-small";

type FontLineHeightKeys =
  | "line-height-heading-2xlarge"
  | "line-height-heading-xlarge"
  | "line-height-heading-large"
  | "line-height-heading-medium"
  | "line-height-heading-small"
  | "line-height-heading-xsmall"
  | "line-height-xlarge"
  | "line-height-large"
  | "line-height-medium";

export type FontWeightKeys = "weight-bold" | "weight-regular";

export { spaceInPixels };
export type {
  GlobalColorScale,
  GlobalColorKeys,
  FontFamilyKeys,
  FontSizeKeys,
  FontLineHeightKeys,
};
