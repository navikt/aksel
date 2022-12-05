import differenceInMonths from "date-fns/differenceInMonths";
import formatRelative from "date-fns/formatRelative";
import nb from "date-fns/esm/locale/nb";

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
        console.log(updateInfo);
        if (
          [
            "ds_artikkel",
            "aksel_artikkel",
            "komponent_artikkel",
            "testDoc",
          ].includes(type) &&
          updateInfo
        ) {
          return {
            title: heading,
            subtitle: `${
              isAfter(updateInfo)
                ? "UTDATERT"
                : formatRelative(new Date(updateInfo), new Date(), {
                    locale: nb,
                  })
            } | ${_type} ${
              `/${tema}` ?? `/${kategori}` ?? "(ingen gruppering)"
            }`,
          };
        }
        return {
          title: heading,
          subtitle: `${_type} ${
            `/${tema}` ?? `/${kategori}` ?? "(ingen gruppering)"
          }`,
        };
      },
    },
  };
};
