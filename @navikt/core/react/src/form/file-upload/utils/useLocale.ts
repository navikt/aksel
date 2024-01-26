export type FileUploadLocale = "nb" | "en";

const getButtonText = (locale: FileUploadLocale, multiple: boolean) => {
  switch (locale) {
    case "nb":
      return `Velg ${multiple ? "filer" : "fil"}`;
    case "en":
      return `Choose ${multiple ? "files" : "file"}`;
    default:
      return `Velg ${multiple ? "filer" : "fil"}`;
  }
};

const getDragAndDropText = (locale: FileUploadLocale, multiple: boolean) => {
  switch (locale) {
    case "nb":
      return `Dra og slipp ${multiple ? "filer" : "fil"} her`;
    case "en":
      return `Drag and drop ${multiple ? "files" : "file"} here`;
    default:
      return `Dra og slipp ${multiple ? "filer" : "fil"} her`;
  }
};

const getDropText = (locale: FileUploadLocale) => {
  switch (locale) {
    case "nb":
      return "Slipp";
    case "en":
      return "Drop";
    default:
      return "Slipp";
  }
};

const getOrText = (locale: FileUploadLocale) => {
  switch (locale) {
    case "nb":
      return "eller";
    case "en":
      return "or";
    default:
      return "eller";
  }
};

const getRetryText = (locale: FileUploadLocale, name: string) => {
  switch (locale) {
    case "nb":
      return `Prøv å laste opp filen ${name} på nytt`;
    case "en":
      return `Try to upload the file ${name} again`;
    default:
      return `Prøv å laste opp filen ${name} på nytt`;
  }
};

const getDeleteText = (locale: FileUploadLocale, name: string) => {
  switch (locale) {
    case "en":
      return `Delete ${name}`;
    default:
      return `Slett ${name}`;
  }
};

const getUploadingText = (locale: FileUploadLocale) => {
  switch (locale) {
    case "nb":
      return "Laster opp…";
    case "en":
      return "Uploading…";
    default:
      return "Laster opp…";
  }
};

const getDownloadingText = (locale: FileUploadLocale) => {
  switch (locale) {
    case "nb":
      return "Laster ned…";
    case "en":
      return "Downloading…";
    default:
      return "Laster ned…";
  }
};

export const useLocale = (
  locale: FileUploadLocale,
  options: {
    multiple?: boolean;
    name?: string;
  },
) => {
  const defaults = {
    name: options?.name ?? "",
    multiple: options?.multiple ?? true,
  };

  return {
    button: getButtonText(locale, defaults?.multiple),
    dragAndDrop: getDragAndDropText(locale, defaults?.multiple),
    drop: getDropText(locale),
    or: getOrText(locale),
    retry: getRetryText(locale, defaults?.name),
    delete: getDeleteText(locale, defaults?.name),
    uploading: getUploadingText(locale),
    downloading: getDownloadingText(locale),
  };
};
