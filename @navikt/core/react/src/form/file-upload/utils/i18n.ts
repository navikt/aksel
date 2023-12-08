export const getButtonText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Velg filer";
    case "nn":
      return "Vel filer";
    case "en":
      return "Choose files";
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
  }
};

export const getOrText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
    case "nn":
      return "eller";
    case "en":
      return "or";
  }
};
