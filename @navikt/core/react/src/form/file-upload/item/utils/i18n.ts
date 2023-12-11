export const getRetryText = (locale: "nb" | "nn" | "en", name: string) => {
  switch (locale) {
    case "nb":
      return `Prøv å laste opp filen ${name} på nytt`;
    case "nn":
      return `Prøv å laste opp fila ${name} på nytt`;
    case "en":
      return `Try to upload the file ${name} again`;
    default:
      return `Prøv å laste opp filen ${name} på nytt`;
  }
};

export const getDeleteText = (locale: "nb" | "nn" | "en", name: string) => {
  switch (locale) {
    case "en":
      return `Delete ${name}`;
    default:
      return `Slett ${name}`;
  }
};
