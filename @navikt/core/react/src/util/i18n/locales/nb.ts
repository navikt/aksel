import { Locale, nb } from "date-fns/locale";

interface TranslationMap {
  [component: string]: Record<string, string | Record<string, string> | Locale>;
}

export default {
  global: {
    dateLocale: nb,
    showMore: "Vis mer",
    showLess: "Vis mindre",
    readOnly: "Skrivebeskyttet",
  },

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
  ErrorSummary: {
    heading: "Du må rette disse feilene før du kan fortsette:",
  },
  Loader: {
    title: "Venter…",
  },
  Modal: {
    close: "Lukk",
  },
  Pagination: {
    previous: "Forrige",
    next: "Neste",
  },
  ProgressBar: {
    progress: "{current} av {max}",
    progressUnknown:
      "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder.",
  },
  Search: {
    clear: "Tøm",
    search: "Søk",
  },
  Textarea: {
    /** Screen readers only */
    maxLength: "Tekstområde med plass til {maxLength} tegn.",
    charsTooMany: "{chars} tegn for mye",
    charsLeft: "{chars} tegn igjen",
  },
  Timeline: {
    dayFormat: "dd.MM",
    monthFormat: "MMM yy",
    yearFormat: "yyyy",
    Row: {
      noPeriods: "Ingen perioder",
      period: "{start} til {end}",
      dateFormat: "dd.MM.yyyy",
    },
    Period: {
      success: "Suksess",
      warning: "Advarsel",
      danger: "Fare",
      info: "Info",
      neutral: "Nøytral",
      period: "{status} fra {start} til {end}",
      dateFormat: "dd.MM.yyyy",
    },
    Pin: {
      pin: "Pin: {date}",
      dateFormat: "dd.MM.yyyy",
    },
    Zoom: {
      zoom: "Zoom tidslinjen {start} til {end}",
      reset: "Tilbakestill zoom",
      dateFormat: "dd.MM.yyyy",
    },
  },
} satisfies TranslationMap;
