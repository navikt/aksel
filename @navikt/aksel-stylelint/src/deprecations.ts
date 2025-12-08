type DeprecatedList = {
  classes: string[];
  message: string;
  deprecatePrefix?: boolean;
}[];

export const deprecations: DeprecatedList = [
  {
    classes: ["aksel-deprecated-example", "aksel-other-deprecated-example"],
    message:
      "Removed in vX.X.X, see documentation [link] for more information.",
  },
  {
    classes: ["aksel-deprecated-prefix-example"],
    message:
      "Removed in vX.X.X, see documentation [link] for more information.",
    deprecatePrefix: true,
  },
];
