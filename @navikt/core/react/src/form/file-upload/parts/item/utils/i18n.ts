export const getRetryText = (locale: "nb" | "en", name: string) => {
  switch (locale) {
    case "nb":
      return `Prøv å laste opp filen ${name} på nytt`;
    case "en":
      return `Try to upload the file ${name} again`;
    default:
      return `Prøv å laste opp filen ${name} på nytt`;
  }
};

export const getDeleteText = (locale: "nb" | "en", name: string) => {
  switch (locale) {
    case "en":
      return `Delete ${name}`;
    default:
      return `Slett ${name}`;
  }
};

export const getUploadingText = (locale: "nb" | "en") => {
  switch (locale) {
    case "nb":
      return "Laster opp…";
    case "en":
      return "Uploading…";
    default:
      return "Laster opp…";
  }
};

export const getDownloadingText = (locale: "nb" | "en") => {
  switch (locale) {
    case "nb":
      return "Laster ned…";
    case "en":
      return "Downloading…";
    default:
      return "Laster ned…";
  }
};
