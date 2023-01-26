import differenceInMonths from "date-fns/differenceInMonths";
/* import differenceInDays from "date-fns/differenceInDays"; */

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
          [
            "ds_artikkel",
            "aksel_artikkel",
            "komponent_artikkel",
            "testDoc",
          ].includes(type) &&
          updateInfo
        ) {
          /* const diff = Math.abs(
            differenceInDays(new Date(updateInfo), new Date())
          ); */
          return {
            title: heading,
            subtitle: `${isAfter(updateInfo) ? "UTDATERT" : ""} | ${_type} ${
              tema ?? kategori
                ? `${(tema ?? kategori) && "/ "}${tema ?? kategori ?? ``}`
                : ""
            }`,
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
