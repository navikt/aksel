import { stegaClean } from "next-sanity";
import { AkselColor } from "@navikt/ds-react/types/theme";
import { Komponent_artikkel } from "@/app/_sanity/query-types";
import { AllArticleDocumentsT } from "@/sanity/config";

const doctypeToColorRole: Record<AllArticleDocumentsT, AkselColor> = {
  ds_artikkel: "brand-blue",
  komponent_artikkel: "brand-blue",
  aksel_standalone: "neutral",
} as const;

type StatusTagT = NonNullable<Komponent_artikkel["status"]>["tag"];

const statusToColorRole: Record<NonNullable<StatusTagT>, AkselColor> = {
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
function getStatusTag(dirtyStatusTag: StatusTagT, ignoreStable = false) {
  const statusTag = stegaClean(dirtyStatusTag);

  if (!statusTag || (statusTag === "ready" && ignoreStable)) {
    return null;
  }

  const text = statusToText[statusTag];
  const colorRole = statusToColorRole[statusTag];

  return { text, colorRole };
}

export { doctypeToColorRole, getStatusTag };
