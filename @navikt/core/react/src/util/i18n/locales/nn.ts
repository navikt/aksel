import type { Translations } from "../i18n.types";

export default {
  FileUpload: {
    dropzone: {
      button: "Vel fil",
      buttonMultiple: "Vel filer",
      dragAndDrop: "Dra og slepp fila her",
      dragAndDropMultiple: "Dra og slepp filer her",
      drop: "Slepp",
      or: "eller",
      disabled: "Filopplasting er deaktivert",
      disabledFilelimit: "Du kan ikkje laste opp fleire filer",
    },
    item: {
      retryButtonTitle: "Prøv å laste opp fila på nytt",
      deleteButtonTitle: "Slett fila",
      uploading: "Lastar opp…",
      downloading: "Lastar ned…",
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
    warning: "Åtvaring",
  },
  Chips: {
    Removable: {
      labelSuffix: "slett",
    },
  },
  ExpansionCard: {
    Header: {
      buttonTitle: "Vis meir",
    },
  },
} satisfies Translations;
