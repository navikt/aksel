import { differenceInMonths } from "date-fns";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";

const isAfter = (date: string, threshold: number) =>
  differenceInMonths(new Date(), new Date(date)) >= threshold;

/**
 * @param _type document type
 * @param threshold number of months before article is considered outdated in **months**
 */
export const artikkelPreview = (_type: string, threshold: number = 12) => {
  return {
    preview: {
      select: {
        heading: "heading",
        kategori: "kategori",
        type: "_type",
        lastVerified: "updateInfo.lastVerified",
      },
      prepare(selection) {
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
