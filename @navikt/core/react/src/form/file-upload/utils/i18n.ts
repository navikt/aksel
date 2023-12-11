export const getButtonText = (
  locale: "nb" | "nn" | "en",
  multiple: boolean
) => {
  switch (locale) {
    case "nb":
      return `Velg ${multiple ? "filer" : "fil"}`;
    case "nn":
      return `Vel ${multiple ? "filer" : "fil"}`;
    case "en":
      return `Choose ${multiple ? "files" : "file"}`;
    default:
      return `Velg ${multiple ? "filer" : "fil"}`;
  }
};

export const getDragAndDropText = (
  locale: "nb" | "nn" | "en",
  multiple: boolean
) => {
  switch (locale) {
    case "nb":
      return `Dra og slipp ${multiple ? "filer" : "fil"}`;
    case "nn":
      return `Dra og slepp ${multiple ? "filer" : "fil"}`;
    case "en":
      return `Drag and drop ${multiple ? "files" : "file"}`;
    default:
      return `Dra og slipp ${multiple ? "filer" : "fil"}`;
  }
};

export const getDropText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Slipp";
    case "nn":
      return "Slepp";
    case "en":
      return "Drop";
    default:
      return "Slipp";
  }
};

export const getOrText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
    case "nn":
      return "eller";
    case "en":
      return "or";
    default:
      return "eller";
  }
};
