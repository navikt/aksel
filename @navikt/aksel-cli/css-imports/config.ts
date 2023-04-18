export type AnswersT = {
  "config-type": "regular" | "easy" | "advanced";
  cdn: "static" | "cdn";
  tailwind?: boolean;
  autoscan?: boolean;
  imports?: { default: string[]; components: string[] };
  output: "print" | "clipboard" | "print-clipboard";
};
