export const getButtonText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Velg dine filer"
    case "nn":
      return "Vel filene dine"
    case "en":
      return "Choose your files"
  }
}

export const getDragAndLetGoText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Dra og slipp"
    case "nn":
      return "Dra og slepp"
    case "en":
      return "Drag and drop"
  }
}

export const getOrText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
    case "nn":
      return "eller"
    case "en":
      return "or"
  }
}