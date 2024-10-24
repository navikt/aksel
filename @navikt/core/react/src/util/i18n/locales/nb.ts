interface TranslationMap {
  [component: string]: Record<string, string | Record<string, string>>;
}

export default {
  FileUpload: {
    dropzone: {
      button: "Velg fil",
      buttonMultiple: "Velg filer",
      dragAndDrop: "Dra og slipp filen her",
      dragAndDropMultiple: "Dra og slipp filer her",
      drop: "Slipp",
      or: "eller",
      disabled: "Filopplasting er deaktivert",
      disabledFilelimit: "Du kan ikke laste opp flere filer",
    },
    item: {
      retryButtonTitle: "Prøv å laste opp filen på nytt",
      deleteButtonTitle: "Slett filen",
      uploading: "Laster opp…",
      downloading: "Laster ned…",
    },
  },
  FormProgress: {
    step: "Steg {activeStep} av {totalSteps}",
    showAllSteps: "Vis alle steg",
    hideAllSteps: "Skjul alle steg",
  },
  Alert: {
    closeAlert: "Lukk varsel",
    closeMessage: "Lukk melding",
    error: "Feil",
    info: "Informasjon",
    success: "Suksess",
    warning: "Advarsel",
  },
  Chips: {
    Removable: {
      /** Will be appended to the accessible name for the button. */
      labelSuffix: "slett",
    },
  },
  Search: {
    clear: "Tøm",
    Button: {
      search: "Søk",
    },
  },
} satisfies TranslationMap;
