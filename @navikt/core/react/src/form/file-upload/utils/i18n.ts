export const getButtonText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Velg filer";
    case "nn":
      return "Vel filer";
    case "en":
      return "Choose files";
    default:
      return "Velg filer";
  }
};

export const getDragAndDropText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Dra og slipp filer";
    case "nn":
      return "Dra og slepp filer";
    case "en":
      return "Drag and drop files";
    default:
      return "Dra og slipp filer";
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
