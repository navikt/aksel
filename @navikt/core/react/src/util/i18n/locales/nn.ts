import { nn } from "date-fns/locale";
import type { Translations } from "../i18n.types";

export default {
  global: {
    dateLocale: nn,
    showMore: "Vis meir",
    showLess: "Vis mindre",
    readOnly: "Skrivebeskytta",
    close: "Lukk",
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
  Combobox: {
    addOption: "Legg til",
    loading: "Søker…",
    maxSelected: "{selected} av maks {limit} er valt.",
  },
  CopyButton: {
    title: "Kopier",
    activeText: "Kopiert!",
  },
  DatePicker: {
    chooseDate: "Vel dato",
    chooseDates: "Vel datoar",
    chooseDateRange: "Vel start- og sluttdato",
    chooseMonth: "Vel månad",
    week: "Veke",
    weekNumber: "Veke {week}",
    selectWeekNumber: "Vel veke {week}",
    month: "Månad",
    goToNextMonth: "Gå til neste månad",
    goToPreviousMonth: "Gå til førre månad",
    year: "År",
    goToNextYear: "Gå til neste år",
    goToPreviousYear: "Gå til førre år",
    openDatePicker: "Opne datoveljar",
    openMonthPicker: "Opne månadsveljar",
    closeDatePicker: "Lukk datoveljar",
    closeMonthPicker: "Lukk månadsveljar",
  },
  ErrorSummary: {
    heading: "Du må rette desse feila før du kan halde fram:",
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
  FormSummary: {
    editAnswer: "Endre svar",
  },
  GuidePanel: {
    illustrationLabel: "Illustrasjon av rettleiar",
  },
  HelpText: {
    title: "Meir informasjon",
  },
  Loader: {
    title: "Ventar…",
  },
  Pagination: {
    previous: "Førre",
    next: "Neste",
  },
  Process: {
    activeLabel: "Aktiv",
  },
  ProgressBar: {
    progress: "{current} av {max}",
    progressUnknown:
      "Framdrift kan ikkje bereknast, antatt tid er {seconds} sekund.",
  },
  Search: {
    clear: "Tøm feltet",
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
} satisfies Translations;
