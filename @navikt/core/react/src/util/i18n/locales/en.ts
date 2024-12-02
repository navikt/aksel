import { enGB } from "date-fns/locale";
import type { Translations } from "../i18n.types";

export default {
  global: {
    dateLocale: enGB,
    showMore: "Show more",
    showLess: "Show less",
    readOnly: "Read-only",
  },

  FileUpload: {
    dropzone: {
      button: "Choose file",
      buttonMultiple: "Choose files",
      dragAndDrop: "Drag and drop file here",
      dragAndDropMultiple: "Drag and drop files here",
      drop: "Drop",
      or: "or",
      disabled: "File upload disabled",
      disabledFilelimit: "You cannot upload more files",
    },
    item: {
      retryButtonTitle: "Try uploading the file again",
      deleteButtonTitle: "Delete file",
      uploading: "Uploading…",
      downloading: "Downloading…",
    },
  },
  FormProgress: {
    step: "Step {activeStep} of {totalSteps}",
    showAllSteps: "Show all steps",
    hideAllSteps: "Hide all steps",
  },
  Alert: {
    closeAlert: "Close alert",
    closeMessage: "Close message",
    error: "Error",
    info: "Information",
    success: "Success",
    warning: "Warning",
  },
  Chips: {
    Removable: {
      labelSuffix: "delete",
    },
  },
  ErrorSummary: {
    heading: "You must correct the following errors before you can continue:",
  },
  Loader: {
    title: "Waiting…",
  },
  Modal: {
    close: "Close",
  },
  Pagination: {
    previous: "Previous",
    next: "Next",
  },
  ProgressBar: {
    progress: "{current} of {max}",
    progressUnknown:
      "Progress is unknown, estimated time is {seconds} seconds.",
  },
  Search: {
    clear: "Clear",
    search: "Search",
  },
  Textarea: {
    maxLength: "Text area with a {maxLength} character limit.",
    charsTooMany: "{chars} characters too many",
    charsLeft: "{chars} characters left",
  },
  Timeline: {
    dateFormat: "yyyy-MM-dd",
    dayFormat: "d MMM",
    monthFormat: "MMM yyyy",
    yearFormat: "yyyy",
    Row: {
      noPeriods: "No periods",
      period: "{start} to {end}",
    },
    Period: {
      success: "Success",
      warning: "Warning",
      danger: "Danger",
      info: "Info",
      neutral: "Neutral",
      period: "{status} from {start} to {end}",
    },
    Pin: {
      pin: "Pin: {date}",
    },
    Zoom: {
      zoom: "Zoom timeline {start} to {end}",
      reset: "Reset zoom",
    },
  },
  DatePicker: {
    close: "Close",
    chooseDate: "Choose date",
    chooseDates: "Choose dates",
    chooseDateRange: "Choose start and end date",
    chooseMonth: "Choose month",
    week: "Week",
    weekNumber: "Week {week}",
    selectWeekNumber: "Select week {week}",
    month: "Month",
    goToNextMonth: "Go to next month",
    goToPreviousMonth: "Go to previous month",
    year: "Year",
    goToNextYear: "Go to next year",
    goToPreviousYear: "Go to previous year",
    openDatePicker: "Open date picker",
    openMonthPicker: "Open month picker",
    closeDatePicker: "Close date picker",
    closeMonthPicker: "Close month picker",
  },
  Combobox: {
    addOption: "Add",
    loading: "Searching…",
    maxSelected: "{selected} of max {limit} are selected.",
    clear: "Clear",
  },
} satisfies Translations;
