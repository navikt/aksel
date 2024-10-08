import type nb from "./nb";

export default {
  FileUpload: {
    dropzone: {
      button: "Select file",
      buttonMultiple: "Select files",
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
} satisfies typeof nb;
