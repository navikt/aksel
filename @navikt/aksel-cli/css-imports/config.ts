export type AnswersT = {
  "config-type": "simple" | "easy" | "advanced";
  cdn: boolean;
  tailwind?: boolean;
  autoscan?: boolean;
  imports?: { default: string[]; components: string[] };
  output: "print" | "clipboard" | "print-clipboard";
};
