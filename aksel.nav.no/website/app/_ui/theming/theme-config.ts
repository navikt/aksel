import { GlobalColorRoles } from "@navikt/ds-tokens/types";
import { Komponent_artikkel } from "@/app/_sanity/query-types";
import { AkselBrandColors } from "@/app/theme";
import { AllArticleDocumentsT } from "@/sanity/config";

const doctypeToColorRole: Record<AllArticleDocumentsT, string> = {
  ds_artikkel: "brand-blue",
  komponent_artikkel: "brand-blue",
  templates_artikkel: "brand-blue",
  aksel_artikkel: "aksel-brand-teal",
  aksel_blogg: "aksel-brand-pink",
  aksel_prinsipp: "neutral",
  aksel_standalone: "neutral",
} as const;

type StatusTagT = NonNullable<Komponent_artikkel["status"]>["tag"];

const statusToColorRole: Record<
  NonNullable<StatusTagT>,
  GlobalColorRoles | AkselBrandColors
> = {
  beta: "meta-purple",
  deprecated: "neutral",
  new: "success",
  ready: "info",
} as const;

const statusToText: Record<NonNullable<StatusTagT>, string> = {
  beta: "Beta",
  deprecated: "Avviklet",
  new: "Ny",
  ready: "Stabil",
} as const;

/**
 * Gets config for use in Tag-components on Aksel based on article status.
 * @param statusTag Current tag: beta, deprecated, new, ready
 * @param ignoreStable Counts ready as null
 */
function getStatusTag(statusTag: StatusTagT, ignoreStable = false) {
  if (!statusTag || (statusTag === "ready" && ignoreStable)) {
    return null;
  }

  const text = statusToText[statusTag];
  const colorRole = statusToColorRole[statusTag];

  return { text, colorRole };
}

export { doctypeToColorRole, getStatusTag };
