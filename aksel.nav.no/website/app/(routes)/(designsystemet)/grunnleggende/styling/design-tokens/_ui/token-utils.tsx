import type { TokenDocT } from "@navikt/ds-tokens/token_docs";

const sortTokens = (a: TokenDocT, b: TokenDocT) => {
  switch (a.category) {
    case "backgroundColor":
    case "borderColor":
    case "textColor": {
      if ((a.role || "") > (b.role || "")) {
        return 1;
      }

      if ((a.role || "") < (b.role || "")) {
        return -1;
      }
      return 0;
    }
    case "breakpoint":
      return (
        parseFloat(a.cssValue.replace("px", "")) -
        parseFloat(b.cssValue.replace("px", ""))
      );
    case "font": {
      if (a.group === b.group) {
        if (a.modifier === b.modifier) {
          return (
            parseFloat(a.rawValue.replace("rem", "")) -
            parseFloat(b.rawValue.replace("rem", ""))
          );
        }
        return (a.modifier || "").localeCompare(b.modifier || "", "nb") || -1;
      }
      return (a.group || "").localeCompare(b.group || "", "nb");
    }
    default:
      return parseFloat(a.rawValue.replace("px", "")) >
        parseFloat(b.rawValue.replace("px", ""))
        ? 1
        : -1;
  }
};

export { sortTokens };
