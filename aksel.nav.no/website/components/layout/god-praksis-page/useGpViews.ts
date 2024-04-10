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

/**
 * Tracks the current filter for current God Praksis tema/page.
 * We track the current "undertema" and "innholdstype" in the URL query.
 * If both are present, we are in a "both" view.
 * If only "undertema" is present, we are in a "undertema" view.
 * If only "innholdstype" is present, we are in a "innholdstype" view.
 * If neither are present, we are in a "none" view.
 *
 * @returns The current view state.
 */
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
