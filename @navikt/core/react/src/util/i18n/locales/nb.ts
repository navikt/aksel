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
    dateFormat: "dd.MM.yyyy",
    dayFormat: "dd.MM",
    monthFormat: "MMM yy",
    yearFormat: "yyyy",
    Row: {
      noPeriods: "Ingen perioder",
      period: "{start} til {end}",
    },
    Period: {
      success: "Suksess",
      warning: "Advarsel",
      danger: "Fare",
      info: "Info",
      neutral: "Nøytral", // TODO: Consider making these global
      period: "{status} fra {start} til {end}",
    },
    Pin: {
      pin: "Pin: {date}",
    },
    Zoom: {
      zoom: "Zoom tidslinjen {start} til {end}",
      reset: "Tilbakestill tidsperspektiv",
    },
  },
  DatePicker: {
    close: "Lukk", // TODO: Consider making global
    chooseDate: "Velg dato",
    chooseDates: "Velg datoer",
    chooseDateRange: "Velg start- og sluttdato",
    chooseMonth: "Velg måned",
    week: "Uke",
    weekNumber: "Uke {week}",
    selectWeekNumber: "Velg uke {week}",
    month: "Måned",
    nextMonth: "Gå til neste måned",
    previousMonth: "Gå til forrige måned",
    year: "År",
    nextYear: "Gå til neste år",
    previousYear: "Gå til forrige år",
    openDatePicker: "Åpne datovelger",
    openMonthPicker: "Åpne månedsvelger",
    closeDatePicker: "Lukk datovelger",
    closeMonthPicker: "Lukk månedsvelger",
  },
} satisfies TranslationMap;
