import { differenceInDays } from "date-fns";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { DEFAULT_OUTDATED_THRESHOLD } from "../../../structure/article-lists";

const isAfter = (date: string, threshold: number) =>
  differenceInDays(new Date(), new Date(date)) >= threshold;

/**
 * @param _type document type
 * @param threshold number of days before article is considered outdated
 */
export const artikkelPreview = (
  _type: string,
  threshold: number = DEFAULT_OUTDATED_THRESHOLD,
) => {
  return {
    preview: {
      select: {
        heading: "heading",
        kategori: "kategori",
        type: "_type",
        lastVerified: "updateInfo.lastVerified",
      },
      prepare(selection: any) {
        const { heading, kategori, type, lastVerified } = selection;
        if (
          ["ds_artikkel", "aksel_artikkel", "komponent_artikkel"].includes(
            type,
          ) &&
          lastVerified
        ) {
          const markAsOutdated = isAfter(lastVerified, threshold);
          return {
            title: heading,
            subtitle: `${markAsOutdated ? "UTDATERT |" : ""} ${_type} ${
              kategori ? `/ ${kategori}` : ""
            }`,
            media: () =>
              markAsOutdated ? (
                <HourglassBottomFilledIcon aria-hidden />
              ) : undefined,
          };
        }
        return {
          title: heading,
          subtitle: `${_type} ${kategori ? `/ ${kategori}` : ""}`,
        };
      },
    },
  };
};
