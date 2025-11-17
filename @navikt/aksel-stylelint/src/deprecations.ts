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
      "Removed in v5.0.0, use `.navds-modal::backdrop` and `.navds-modal--polyfilled + .backdrop` instead",
  },
  {
    classes: ["navds-modal__button--shake"],
    message: "Removed in v5.0.0",
  },
  {
    classes: ["navds-modal__content"],
    message: "Renamed to `.navds-modal__body` in v5.0.0",
  },
  {
    classes: ["navds-guide__illustration"],
    message: "Use `.navds-guide` instead",
  },
  {
    classes: [
      "navds-guide__illustration--small",
      "navds-guide__illustration--medium",
    ],
    message:
      "There is no 1:1 replacement for this, the size will depend on the 'poster' prop and the viewport width",
  },
  {
    classes: ["navds-grid", "navds-content-container"],
    deprecatePrefix: true,
    message:
      "Components were replaced by `HGrid` and `Page.Block` in version 6",
  },
  {
    classes: ["navds-textarea__wrapper"],
    message: "Removed in v6.0.0",
  },
  {
    classes: [
      "navds-pagination__prev-next-icon",
      "navds-pagination__next-text",
      "navds-pagination__prev-text",
    ],
    message: "These classes had no effect and were removed in v7.1.0",
  },
  {
    classes: ["navds-list--nested", "navds-list__item-content"],
    message: "Removed in v7.1.1",
  },
  {
    classes: ["navds-combobox__button-clear"],
    message: "Removed in v7.8.0",
  },
  {
    classes: ["navds-switch__checkmark"],
    message: "Removed in v7.24.0",
  },
  {
    classes: ["navds-modal__document-body"],
    message: "Removed in v8. We recommend not using this class anymore.",
  },
];
