import { differenceInMonths } from "date-fns";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";

const isAfter = (date: string, threshold) =>
  differenceInMonths(new Date(), new Date(date)) >= threshold;

export const artikkelPreview = (_type: string, threshold: number = 12) => {
  return {
    preview: {
      select: {
        heading: "heading",
        tema: "tema.0.title",
        kategori: "kategori",
        type: "_type",
        updateInfo: "updateInfo.lastVerified",
      },
      prepare(selection) {
        const { heading, tema, kategori, type, updateInfo } = selection;
        if (
          ["ds_artikkel", "aksel_artikkel", "komponent_artikkel"].includes(
            type,
          ) &&
          updateInfo
        ) {
          return {
            title: heading,
            subtitle: `${
              isAfter(updateInfo, threshold) ? "UTDATERT |" : ""
            }  ${_type} ${
              tema ?? kategori
                ? `${(tema ?? kategori) && "/ "}${tema ?? kategori ?? ``}`
                : ""
            }`,
            media: isAfter(updateInfo, threshold) && HourglassBottomFilledIcon,
          };
        }
        return {
          title: heading,
          subtitle: `${_type} ${
            tema ?? kategori
              ? `${(tema ?? kategori) && "/ "}${tema ?? kategori ?? ``}`
              : ""
          }`,
        };
      },
    },
  };
};
