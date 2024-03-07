import { useRouter } from "next/router";

type ViewBoth = {
  view: "both";
  innholdstype: string;
  undertema: string;
};

type ViewInnholdstype = {
  view: "innholdstype";
  innholdstype: string;
};

type ViewUndertema = {
  view: "undertema";
  undertema: string;
};

type ViewNone = {
  view: "none";
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
    };
  }

  if (safeUndertema) {
    return {
      view: "undertema",
      undertema: safeUndertema,
    };
  }

  return {
    view: "none",
  };
}

function safeString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  return undefined;
}
