type DeprecatedList = {
  classes: string[];
  message: string;
  deprecatePrefix?: boolean;
}[];

export const deprecations: DeprecatedList = [
  {
    classes: ["navdsi-deprecated-example", "navdsi-other-deprecated-example"],
    message: "Removed in vX.X.X, see documentation [link] for more information",
  },
  {
    classes: [
      "navdsi-dropdown",
      "navdsi-copy-to-clipboard",
      "navdsi-header",
      "navdsi-timeline",
    ],
    message:
      "Class were moved to '@navikt/ds-css' and renamed with 'navds'-prefix in v4.0.0. Docs: https://aksel.nav.no/grunnleggende/kode/endringslogg#h728704adeb59.",
    deprecatePrefix: true,
  },
  {
    classes: ["navds-chips--icon-left"],
    message:
      "In v4.1.0 Chips. Toggle no longer handles special alignment for checkmark-icon, thus removing this class",
  },
  {
    classes: ["navds-modal__overlay"],
    message:
      "Removed in v5.0.0 - `Modal` is migrated to HTML `<dialog>`. Traget the `::backdrop` pseudo-element instead.",
  },
  {
    classes: ["navds-modal__button--shake", "navds-modal--focus"],
    message:
      "Removed in v5.0.0 - `Modal` is migrated to HTML `<dialog>`. No longer needed.",
  },
];
