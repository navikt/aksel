export const getButtonText = (locale: "nb" | "en", multiple: boolean) => {
  switch (locale) {
    case "nb":
      return `Velg ${multiple ? "filer" : "fil"}`;
    case "en":
      return `Choose ${multiple ? "files" : "file"}`;
    default:
      return `Velg ${multiple ? "filer" : "fil"}`;
  }
};

export const getDragAndDropText = (locale: "nb" | "en", multiple: boolean) => {
  switch (locale) {
    case "nb":
      return `Dra og slipp ${multiple ? "filer" : "fil"}`;
    case "en":
      return `Drag and drop ${multiple ? "files" : "file"}`;
    default:
      return `Dra og slipp ${multiple ? "filer" : "fil"}`;
  }
};

export const getDropText = (locale: "nb" | "en") => {
  switch (locale) {
    case "nb":
      return "Slipp";
    case "en":
      return "Drop";
    default:
      return "Slipp";
  }
};

export const getOrText = (locale: "nb" | "en") => {
  switch (locale) {
    case "nb":
    case "en":
      return "or";
    default:
      return "eller";
  }
};
