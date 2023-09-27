export type AnswersT = {
  "config-type": "regular" | "easy" | "advanced";
  cdn: "yes" | "no";
  version: string;
  tailwind?: "yes" | "no";
  layers?: "yes" | "no";
  autoscan?: "yes" | "no";
  scandir?: string;
  imports?: string[];
  output: "print" | "clipboard" | "print-clipboard";
};

export const ComponentPrefix = "C_";
export const layerSuffix = " layer(aksel)";
