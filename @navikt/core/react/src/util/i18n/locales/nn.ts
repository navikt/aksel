import { nn } from "date-fns/locale";
import type { Translations } from "../i18n.types";

export default {
  global: {
    dateLocale: nn,
    showMore: "Vis meir",
    showLess: "Vis mindre",
    readOnly: "Skrivebeskytta",
  },

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
  ErrorSummary: {
    heading: "Du må rette desse feila før du kan halde fram:",
  },
  Loader: {
    title: "Ventar…",
  },
  Modal: {
    close: "Lukk",
  },
  Pagination: {
    previous: "Førre",
    next: "Neste",
  },
  ProgressBar: {
    progress: "{current} av {max}",
    progressUnknown:
      "Framdrift kan ikkje bereknast, antatt tid er {seconds} sekund.",
  },
  Search: {
    clear: "Tøm",
    search: "Søk",
  },
  Textarea: {
    maxLength: "Tekstområde med plass til {maxLength} teikn.",
    charsTooMany: "{chars} teikn for mykje",
    charsLeft: "{chars} teikn igjen",
  },
  Timeline: {
    dateFormat: "dd.MM.yyyy",
    dayFormat: "dd.MM",
    monthFormat: "MMM yy",
    yearFormat: "yyyy",
    Row: {
      noPeriods: "Ingen periodar",
      period: "{start} til {end}",
    },
    Period: {
      success: "Suksess",
      warning: "Åtvaring",
      danger: "Fare",
      info: "Info",
      neutral: "Nøytral",
      period: "{status} frå {start} til {end}",
    },
    Pin: {
      pin: "Pin: {date}",
    },
    Zoom: {
      zoom: "Zoom tidslina {start} til {end}",
      reset: "Tilbakestill tidsperspektiv",
    },
  },
  Combobox: {
    addOption: "Legg til",
    searching: "Søker…",
    maxSelected: "{selected} av maks {limit} er valt.",
    clear: "Tøm",
    options: "Alternativ",
  },
} satisfies Translations;
