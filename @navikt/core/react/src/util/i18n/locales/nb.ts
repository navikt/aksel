import { Locale, nb } from "date-fns/locale";

interface TranslationMap {
  [component: string]: Record<string, string | Record<string, string> | Locale>;
}

export default {
  global: {
    dateLocale: nb,
    /** @default "Vis mer" 
    * @default "Vis mer" */
    showMore: "Vis mer",
    /** @default "Vis mindre" 
    * @default "Vis mindre" */
    showLess: "Vis mindre",
    /** @default "Skrivebeskyttet" 
    * @default "Skrivebeskyttet" */
    readOnly: "Skrivebeskyttet",
    /** @default "Lukk" 
    * @default "Lukk" */
    close: "Lukk",
  },

  Alert: {
    /** @default "Lukk varsel" 
    * @default "Lukk varsel" */
    closeAlert: "Lukk varsel",
    /** @default "Lukk melding" 
    * @default "Lukk melding" */
    closeMessage: "Lukk melding",
    /** @default "Feil" 
    * @default "Feil" */
    error: "Feil",
    /** @default "Informasjon" 
    * @default "Informasjon" */
    info: "Informasjon",
    /** @default "Suksess" 
    * @default "Suksess" */
    success: "Suksess",
    /** @default "Advarsel" 
    * @default "Advarsel" */
    warning: "Advarsel",
  },
  Chips: {
    Removable: {
      /** Will be appended to the accessible name for the button. 
            * @default "slett" 
      * @default "slett" */
      labelSuffix: "slett",
    },
  },
  Combobox: {
    /** The input value will be appended to the end of this text, e.g. `Legg til "input value"`. 
        * @default "Legg til" 
    * @default "Legg til" */
    addOption: "Legg til",
    /** Loader title 
        * @default "Søker…" 
    * @default "Søker…" */
    loading: "Søker…",
    /** @default "{selected} av maks {limit} er valgt." 
    * @default "{selected} av maks {limit} er valgt." */
    maxSelected: "{selected} av maks {limit} er valgt.",
  },
  CopyButton: {
    /** @default "Kopier" 
    * @default "Kopier" */
    title: "Kopier",
    /** @default "Kopiert!" 
    * @default "Kopiert!" */
    activeText: "Kopiert!",
  },
  DatePicker: {
    /** @default "Velg dato" 
    * @default "Velg dato" */
    chooseDate: "Velg dato",
    /** @default "Velg datoer" 
    * @default "Velg datoer" */
    chooseDates: "Velg datoer",
    /** @default "Velg start- og sluttdato" 
    * @default "Velg start- og sluttdato" */
    chooseDateRange: "Velg start- og sluttdato",
    /** @default "Velg måned" 
    * @default "Velg måned" */
    chooseMonth: "Velg måned",
    /** @default "Uke" 
    * @default "Uke" */
    week: "Uke",
    /** @default "Uke {week}" 
    * @default "Uke {week}" */
    weekNumber: "Uke {week}",
    /** @default "Velg uke {week}" 
    * @default "Velg uke {week}" */
    selectWeekNumber: "Velg uke {week}",
    /** @default "Måned" 
    * @default "Måned" */
    month: "Måned",
    /** @default "Gå til neste måned" 
    * @default "Gå til neste måned" */
    goToNextMonth: "Gå til neste måned",
    /** @default "Gå til forrige måned" 
    * @default "Gå til forrige måned" */
    goToPreviousMonth: "Gå til forrige måned",
    /** @default "År" 
    * @default "År" */
    year: "År",
    /** @default "Gå til neste år" 
    * @default "Gå til neste år" */
    goToNextYear: "Gå til neste år",
    /** @default "Gå til forrige år" 
    * @default "Gå til forrige år" */
    goToPreviousYear: "Gå til forrige år",
    /** @default "Åpne datovelger" 
    * @default "Åpne datovelger" */
    openDatePicker: "Åpne datovelger",
    /** @default "Åpne månedsvelger" 
    * @default "Åpne månedsvelger" */
    openMonthPicker: "Åpne månedsvelger",
    /** @default "Lukk datovelger" 
    * @default "Lukk datovelger" */
    closeDatePicker: "Lukk datovelger",
    /** @default "Lukk månedsvelger" 
    * @default "Lukk månedsvelger" */
    closeMonthPicker: "Lukk månedsvelger",
  },
  ErrorSummary: {
    /** @default "Du må rette disse feilene før du kan fortsette:" 
    * @default "Du må rette disse feilene før du kan fortsette:" */
    heading: "Du må rette disse feilene før du kan fortsette:",
  },
  FileUpload: {
    dropzone: {
      /** @default "Velg fil" 
      * @default "Velg fil" */
      button: "Velg fil",
      /** @default "Velg filer" 
      * @default "Velg filer" */
      buttonMultiple: "Velg filer",
      /** @default "Dra og slipp filen her" 
      * @default "Dra og slipp filen her" */
      dragAndDrop: "Dra og slipp filen her",
      /** @default "Dra og slipp filer her" 
      * @default "Dra og slipp filer her" */
      dragAndDropMultiple: "Dra og slipp filer her",
      /** @default "Slipp" 
      * @default "Slipp" */
      drop: "Slipp",
      /** @default "eller" 
      * @default "eller" */
      or: "eller",
      /** @default "Filopplasting er deaktivert" 
      * @default "Filopplasting er deaktivert" */
      disabled: "Filopplasting er deaktivert",
      /** @default "Du kan ikke laste opp flere filer" 
      * @default "Du kan ikke laste opp flere filer" */
      disabledFilelimit: "Du kan ikke laste opp flere filer",
    },
    item: {
      /** @default "Prøv å laste opp filen på nytt" 
      * @default "Prøv å laste opp filen på nytt" */
      retryButtonTitle: "Prøv å laste opp filen på nytt",
      /** @default "Slett filen" 
      * @default "Slett filen" */
      deleteButtonTitle: "Slett filen",
      /** @default "Laster opp…" 
      * @default "Laster opp…" */
      uploading: "Laster opp…",
      /** @default "Laster ned…" 
      * @default "Laster ned…" */
      downloading: "Laster ned…",
    },
  },
  FormProgress: {
    /** @default "Steg {activeStep} av {totalSteps}" 
    * @default "Steg {activeStep} av {totalSteps}" */
    step: "Steg {activeStep} av {totalSteps}",
    /** @default "Vis alle steg" 
    * @default "Vis alle steg" */
    showAllSteps: "Vis alle steg",
    /** @default "Skjul alle steg" 
    * @default "Skjul alle steg" */
    hideAllSteps: "Skjul alle steg",
  },
  FormSummary: {
    /** @default "Endre svar" 
    * @default "Endre svar" */
    editAnswer: "Endre svar",
  },
  GuidePanel: {
    /** @default "Illustrasjon av veileder" 
    * @default "Illustrasjon av veileder" */
    illustrationLabel: "Illustrasjon av veileder",
  },
  HelpText: {
    /** @default "Mer informasjon" 
    * @default "Mer informasjon" */
    title: "Mer informasjon",
  },
  Loader: {
    /** @default "Venter…" 
    * @default "Venter…" */
    title: "Venter…",
  },
  Pagination: {
    /** @default "Forrige" 
    * @default "Forrige" */
    previous: "Forrige",
    /** @default "Neste" 
    * @default "Neste" */
    next: "Neste",
  },
  Process: {
    /** @default "Aktiv" 
    * @default "Aktiv" */
    active: "Aktiv",
  },
  ProgressBar: {
    /** @default "{current} av {max}" 
    * @default "{current} av {max}" */
    progress: "{current} av {max}",
    /** @default "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder." 
    * @default "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder." */
    progressUnknown: "Fremdrift kan ikke beregnes, antatt tid er {seconds} sekunder.",
  },
  Search: {
    /** @default "Tøm feltet" 
    * @default "Tøm feltet" */
    clear: "Tøm feltet",
    /** @default "Søk" 
    * @default "Søk" */
    search: "Søk",
  },
  Textarea: {
    /** Screen readers only 
        * @default "Tekstområde med plass til {maxLength} tegn." 
    * @default "Tekstområde med plass til {maxLength} tegn." */
    maxLength: "Tekstområde med plass til {maxLength} tegn.",
    /** @default "{chars} tegn for mye" 
    * @default "{chars} tegn for mye" */
    charsTooMany: "{chars} tegn for mye",
    /** @default "{chars} tegn igjen" 
    * @default "{chars} tegn igjen" */
    charsLeft: "{chars} tegn igjen",
  },
  Timeline: {
    /** @default "dd.MM.yyyy" 
    * @default "dd.MM.yyyy" */
    dateFormat: "dd.MM.yyyy",
    /** @default "dd.MM" 
    * @default "dd.MM" */
    dayFormat: "dd.MM",
    /** @default "MMM yy" 
    * @default "MMM yy" */
    monthFormat: "MMM yy",
    /** @default "yyyy" 
    * @default "yyyy" */
    yearFormat: "yyyy",
    Row: {
      /** @default "Ingen perioder" 
      * @default "Ingen perioder" */
      noPeriods: "Ingen perioder",
      /** @default "{start} til {end}" 
      * @default "{start} til {end}" */
      period: "{start} til {end}",
    },
    Period: {
      /** @default "Suksess" 
      * @default "Suksess" */
      success: "Suksess",
      /** @default "Advarsel" 
      * @default "Advarsel" */
      warning: "Advarsel",
      /** @default "Fare" 
      * @default "Fare" */
      danger: "Fare",
      /** @default "Info" 
      * @default "Info" */
      info: "Info",
      /** @default "Nøytral" 
      * @default "Nøytral" */
      neutral: "Nøytral",
      /** @default "{status} fra {start} til {end}" 
      * @default "{status} fra {start} til {end}" */
      period: "{status} fra {start} til {end}",
    },
    Pin: {
      /** @default "Pin: {date}" 
      * @default "Pin: {date}" */
      pin: "Pin: {date}",
    },
    Zoom: {
      /** @default "Zoom tidslinjen {start} til {end}" 
      * @default "Zoom tidslinjen {start} til {end}" */
      zoom: "Zoom tidslinjen {start} til {end}",
      /** @default "Tilbakestill tidsperspektiv" 
      * @default "Tilbakestill tidsperspektiv" */
      reset: "Tilbakestill tidsperspektiv",
    },
  },
} satisfies TranslationMap;
