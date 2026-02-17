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
    close: "Lukk",
    error: "Feil",
    info: "Informasjon",
    success: "Suksess",
    warning: "Advarsel",
    announcement: "Kunngjøring",
  },
  Chips: {
    Removable: {
      /** Will be appended to the accessible name for the button. */
      labelSuffix: "slett",
    },
  },
  Combobox: {
    /** The input value will be appended to the end of this text, e.g. `Legg til "input value"`. */
    addOption: "Legg til",
    noMatches: "Ingen søketreff",
    /** Loader title */
    loading: "Søker…",
    maxSelected: "{selected} av maks {limit} er valgt.",
  },
  CopyButton: {
    title: "Kopier",
    activeText: "Kopiert!",
  },
  DatePicker: {
    chooseDate: "Velg dato",
    chooseDates: "Velg datoer",
    chooseDateRange: "Velg start- og sluttdato",
    chooseMonth: "Velg måned",
    week: "Uke",
    weekNumber: "Uke {week}",
    selectWeekNumber: "Velg uke {week}",
    month: "Måned",
    goToNextMonth: "Gå til neste måned",
    goToPreviousMonth: "Gå til forrige måned",
    year: "År",
    goToNextYear: "Gå til neste år",
    goToPreviousYear: "Gå til forrige år",
    openDatePicker: "Åpne datovelger",
    openMonthPicker: "Åpne månedsvelger",
    closeDatePicker: "Lukk datovelger",
    closeMonthPicker: "Lukk månedsvelger",
  },
  ErrorSummary: {
    heading: "Du må rette disse feilene før du kan fortsette:",
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
  FormSummary: {
    editAnswer: "Endre svar",
  },
  GuidePanel: {
    illustrationLabel: "Illustrasjon av veileder",
  },
  HelpText: {
    title: "Mer informasjon",
  },
  Loader: {
    title: "Venter…",
  },
  Pagination: {
    previous: "Forrige",
    next: "Neste",
  },
  Process: {
    active: "Aktiv",
  },
  ProgressBar: {
    progress: "{current} av {max}",
    progressUnknown:
      "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder.",
  },
  Search: {
    clear: "Tøm feltet",
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
      neutral: "Nøytral",
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
  Tooltip: {
    shortcutSeparator: "eller",
  },
} satisfies TranslationMap;
