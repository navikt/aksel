export type AnswersT = {
  "config-type": "regular" | "easy" | "advanced";
  cdn: "static" | "cdn";
  tailwind?: boolean;
  layers?: boolean;
  autoscan?: boolean;
  scandir?: string;
  imports?: string[];
  output: "print" | "clipboard" | "print-clipboard";
};

export const ComponentPrefix = "C_";
