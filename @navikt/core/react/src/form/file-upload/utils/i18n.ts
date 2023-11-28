export const getButtonText = (locale: "nb" | "nn" | "en") => {
  switch (locale) {
    case "nb":
      return "Velg filer"
    case "nn":
      return "Vel filer"
    case "en":
      return "Choose files"
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