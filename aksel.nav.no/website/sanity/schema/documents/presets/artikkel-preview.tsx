import { FileResetIcon } from "@navikt/aksel-icons";
import { DocumentIcon } from "@sanity/icons";
import differenceInMonths from "date-fns/differenceInMonths";
import React from "react";
const isAfter = (date) => differenceInMonths(new Date(), new Date(date)) >= 6;

export const artikkelPreview = (_type: string) => {
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
            type
          ) &&
          updateInfo
        ) {
          return {
            title: heading,
            subtitle: `${isAfter(updateInfo) ? "UTDATERT |" : ""}  ${_type} ${
              tema ?? kategori
                ? `${(tema ?? kategori) && "/ "}${tema ?? kategori ?? ``}`
                : ""
            }`,
            media: () =>
              isAfter(updateInfo) ? (
                <FileResetIcon aria-hidden style={{ fontSize: "4rem" }} />
              ) : (
                <DocumentIcon />
              ),
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
