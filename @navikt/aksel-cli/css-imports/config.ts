export type AnswersT = {
  "config-type": "simple" | "advanced";
  cdn: boolean;
  tailwind?: boolean;
  autoscan?: boolean;
  imports?: { default: string[]; components: string[] };
  output: "print" | "clipboard" | "print-clipboard";
};
