interface TranslationMap {
  [component: string]:
    | Record<string, string>
    | {
        [subComponent: string]: Record<string, string>;
      };
}

export default {
  FileUpload: {
    dropzone: {
      /** @default "Velg fil", */
      button: "Velg fil",
      /** @default "Velg filer", */
      buttonMultiple: "Velg filer",
      /** @default "Dra og slipp filen her", */
      dragAndDrop: "Dra og slipp filen her",
      /** @default "Dra og slipp filer her", */
      dragAndDropMultiple: "Dra og slipp filer her",
      /** @default "Slipp", */
      drop: "Slipp",
      /** @default "eller", */
      or: "eller",
      /** @default "Filopplasting er deaktivert", */
      disabled: "Filopplasting er deaktivert",
      /** @default "Du kan ikke laste opp flere filer", */
      disabledFilelimit: "Du kan ikke laste opp flere filer",
    },
    item: {
      /** @default "Prøv å laste opp filen på nytt", */
      retryButtonTitle: "Prøv å laste opp filen på nytt",
      /** @default "Slett filen", */
      deleteButtonTitle: "Slett filen",
      /** @default "Laster opp…", */
      uploading: "Laster opp…",
      /** @default "Laster ned…", */
      downloading: "Laster ned…",
    },
  },
  FormProgress: {
    /** @default "Steg {activeStep} av {totalSteps}" */
    step: "Steg {activeStep} av {totalSteps}",
    /** @default "Vis alle steg" */
    showAllSteps: "Vis alle steg",
    /** @default "Skjul alle steg" */
    hideAllSteps: "Skjul alle steg",
  },
} satisfies TranslationMap;
