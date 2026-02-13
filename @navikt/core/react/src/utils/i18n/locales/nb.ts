import { Locale, nb } from "date-fns/locale";

interface TranslationMap {
  [component: string]: Record<string, string | Record<string, string> | Locale>;
}

export default {
  global: {
    dateLocale: nb,
    /** @default "Vis mer" */
    showMore: "Vis mer",
    /** @default "Vis mindre" */
    showLess: "Vis mindre",
    /** @default "Skrivebeskyttet" */
    readOnly: "Skrivebeskyttet",
    /** @default "Lukk" */
    close: "Lukk",
    /** @default "Feil" */
    error: "Feil",
    /** @default "Informasjon" */
    info: "Informasjon",
    /** @default "Suksess" */
    success: "Suksess",
    /** @default "Advarsel" */
    warning: "Advarsel",
    /** @default "Kunngjøring" */
    announcement: "Kunngjøring",
  },
  Chips: {
    Removable: {
      /** Will be appended to the accessible name for the button.
       * @default "slett" */
      labelSuffix: "slett",
    },
  },
  Combobox: {
    /** The input value will be appended to the end of this text, e.g. `Legg til "input value"`.
     * @default "Legg til" */
    addOption: "Legg til",
    /** @default "Ingen søketreff" */
    noMatches: "Ingen søketreff",
    /** Loader title
     * @default "Søker…" */
    loading: "Søker…",
    /** @default "{selected} av maks {limit} er valgt." */
    maxSelected: "{selected} av maks {limit} er valgt.",
  },
  CopyButton: {
    /** @default "Kopier" */
    title: "Kopier",
    /** @default "Kopiert!" */
    activeText: "Kopiert!",
  },
  DatePicker: {
    /** @default "Velg dato" */
    chooseDate: "Velg dato",
    /** @default "Velg datoer" */
    chooseDates: "Velg datoer",
    /** @default "Velg start- og sluttdato" */
    chooseDateRange: "Velg start- og sluttdato",
    /** @default "Velg måned" */
    chooseMonth: "Velg måned",
    /** @default "Uke" */
    week: "Uke",
    /** @default "Uke {week}" */
    weekNumber: "Uke {week}",
    /** @default "Velg uke {week}" */
    selectWeekNumber: "Velg uke {week}",
    /** @default "Måned" */
    month: "Måned",
    /** @default "Gå til neste måned" */
    goToNextMonth: "Gå til neste måned",
    /** @default "Gå til forrige måned" */
    goToPreviousMonth: "Gå til forrige måned",
    /** @default "År" */
    year: "År",
    /** @default "Gå til neste år" */
    goToNextYear: "Gå til neste år",
    /** @default "Gå til forrige år" */
    goToPreviousYear: "Gå til forrige år",
    /** @default "Åpne datovelger" */
    openDatePicker: "Åpne datovelger",
    /** @default "Åpne månedsvelger" */
    openMonthPicker: "Åpne månedsvelger",
    /** @default "Lukk datovelger" */
    closeDatePicker: "Lukk datovelger",
    /** @default "Lukk månedsvelger" */
    closeMonthPicker: "Lukk månedsvelger",
  },
  ErrorSummary: {
    /** @default "Du må rette disse feilene før du kan fortsette:" */
    heading: "Du må rette disse feilene før du kan fortsette:",
  },
  FileUpload: {
    dropzone: {
      /** @default "Velg fil" */
      button: "Velg fil",
      /** @default "Velg filer" */
      buttonMultiple: "Velg filer",
      /** @default "Dra og slipp filen her" */
      dragAndDrop: "Dra og slipp filen her",
      /** @default "Dra og slipp filer her" */
      dragAndDropMultiple: "Dra og slipp filer her",
      /** @default "Slipp" */
      drop: "Slipp",
      /** @default "eller" */
      or: "eller",
      /** @default "Filopplasting er deaktivert" */
      disabled: "Filopplasting er deaktivert",
      /** @default "Du kan ikke laste opp flere filer" */
      disabledFilelimit: "Du kan ikke laste opp flere filer",
    },
    item: {
      /** @default "Prøv å laste opp filen på nytt" */
      retryButtonTitle: "Prøv å laste opp filen på nytt",
      /** @default "Slett filen" */
      deleteButtonTitle: "Slett filen",
      /** @default "Laster opp…" */
      uploading: "Laster opp…",
      /** @default "Laster ned…" */
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
  FormSummary: {
    /** @default "Endre svar" */
    editAnswer: "Endre svar",
  },
  GuidePanel: {
    /** @default "Illustrasjon av veileder" */
    illustrationLabel: "Illustrasjon av veileder",
  },
  HelpText: {
    /** @default "Mer informasjon" */
    title: "Mer informasjon",
  },
  Loader: {
    /** @default "Venter…" */
    title: "Venter…",
  },
  Pagination: {
    /** @default "Forrige" */
    previous: "Forrige",
    /** @default "Neste" */
    next: "Neste",
  },
  Process: {
    /** @default "Aktiv" */
    active: "Aktiv",
  },
  ProgressBar: {
    /** @default "{current} av {max}" */
    progress: "{current} av {max}",
    /** @default "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder." */
    progressUnknown:
      "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder.",
  },
  Search: {
    /** @default "Tøm feltet" */
    clear: "Tøm feltet",
    /** @default "Søk" */
    search: "Søk",
  },
  Textarea: {
    /** Screen readers only
     * @default "Tekstområde med plass til {maxLength} tegn." */
    maxLength: "Tekstområde med plass til {maxLength} tegn.",
    /** @default "{chars} tegn for mye" */
    charsTooMany: "{chars} tegn for mye",
    /** @default "{chars} tegn igjen" */
    charsLeft: "{chars} tegn igjen",
  },
  Timeline: {
    /** @default "dd.MM.yyyy" */
    dateFormat: "dd.MM.yyyy",
    /** @default "dd.MM" */
    dayFormat: "dd.MM",
    /** @default "MMM yy" */
    monthFormat: "MMM yy",
    /** @default "yyyy" */
    yearFormat: "yyyy",
    Row: {
      /** @default "Ingen perioder" */
      noPeriods: "Ingen perioder",
      /** @default "{start} til {end}" */
      period: "{start} til {end}",
    },
    Period: {
      /** @default "Suksess" */
      success: "Suksess",
      /** @default "Advarsel" */
      warning: "Advarsel",
      /** @default "Fare" */
      danger: "Fare",
      /** @default "Info" */
      info: "Info",
      /** @default "Nøytral" */
      neutral: "Nøytral",
      /** @default "{status} fra {start} til {end}" */
      period: "{status} fra {start} til {end}",
    },
    Pin: {
      /** @default "Pin: {date}" */
      pin: "Pin: {date}",
    },
    Zoom: {
      /** @default "Zoom tidslinjen {start} til {end}" */
      zoom: "Zoom tidslinjen {start} til {end}",
      /** @default "Tilbakestill tidsperspektiv" */
      reset: "Tilbakestill tidsperspektiv",
    },
  },
  Tooltip: {
    /** @default "eller" */
    shortcutSeparator: "eller",
  },
} satisfies TranslationMap;
