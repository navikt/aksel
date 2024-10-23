import type { Translations } from "../i18n.types";

export default {
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
  Modal: {
    close: "Close",
  },
} satisfies Translations;
