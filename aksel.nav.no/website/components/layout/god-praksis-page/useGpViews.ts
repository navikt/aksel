import { useRouter } from "next/router";

type ViewBoth = {
  view: "both";
  innholdstype: string;
  undertema: string;
};

type ViewInnholdstype = {
  view: "innholdstype";
  innholdstype: string;
  undertema: undefined;
};

type ViewUndertema = {
  view: "undertema";
  undertema: string;
  innholdstype: undefined;
};

type ViewNone = {
  view: "none";
  undertema: undefined;
  innholdstype: undefined;
};

export function useGpViews():
  | ViewBoth
  | ViewInnholdstype
  | ViewUndertema
  | ViewNone {
  const { innholdstype: innholdstypeQuery, undertema: undertemaQuery } =
    useRouter().query;

  const safeInnholdstype = safeString(innholdstypeQuery);
  const safeUndertema = safeString(undertemaQuery);

  if (safeInnholdstype && safeUndertema) {
    return {
      view: "both",
      innholdstype: safeInnholdstype,
      undertema: safeUndertema,
    };
  }

  if (safeInnholdstype) {
    return {
      view: "innholdstype",
      innholdstype: safeInnholdstype,
      undertema: undefined,
    };
  }

  if (safeUndertema) {
    return {
      view: "undertema",
      undertema: safeUndertema,
      innholdstype: undefined,
    };
  }

  return {
    view: "none",
    undertema: undefined,
    innholdstype: undefined,
  };
}

export function safeString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return decodeURIComponent(value);
  }

  return undefined;
}
