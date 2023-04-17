export type AnswersT = {
  "config-type": "simple" | "advanced";
  cdn: boolean;
  tailwind?: boolean;
  autoscan?: boolean;
  imports?: string[];
  output: "print" | "clipboard" | "print-clipboard";
};

export const componentPrefix = "COMPONENT-";
