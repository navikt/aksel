import type { Translations } from "../i18n.types";

export default {
  global: {
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
} satisfies Translations;
