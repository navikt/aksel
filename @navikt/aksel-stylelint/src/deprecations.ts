type DeprecatedList = { classes: string[]; message: string }[];

export const deprecations: DeprecatedList = [
  {
    classes: ["navdsi-deprecated-example", "navdsi-other-deprecated-example"],
    message: "Removed in vX.X.X, see documentation [link] for more information",
  },
];
