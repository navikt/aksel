export const labelNext = (localeCode: string | undefined) => {
  switch (localeCode) {
    case "nb":
      return "Gå til neste år";
    case "nn":
      return "Gå til neste år";
    case "en-GB":
      return "Go to next year";
    default:
      return "Gå til neste måned";
  }
};

export const labelPrev = (localeCode: string | undefined): string => {
  switch (localeCode) {
    case "nb":
      return "Gå til forrige år";
    case "nn":
      return "Gå til forrige år";
    case "en-GB":
      return "Go to next year";
    default:
      return "Gå til neste år";
  }
};
