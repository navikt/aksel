import { chipsDataAllQueryResponse } from "../queries";
import { ChipsData, ChipsDataGroupedByTema } from "../types";

export const groupByTema = (
  chipsData: chipsDataAllQueryResponse["chipsDataAll"]
): ChipsDataGroupedByTema => {
  const chipNavData: ChipsDataGroupedByTema = {};
  for (const entry of chipsData) {
    for (const undertema of entry.undertema) {
      if (!chipNavData[undertema.temaSlug]) {
        chipNavData[undertema.temaSlug] = [
          {
            "undertema-title": undertema.title,
            "innholdstype-title": entry.innholdstype,
          },
        ];
        continue;
      }
      chipNavData[undertema.temaSlug].push({
        "undertema-title": undertema.title,
        "innholdstype-title": entry.innholdstype,
      });
    }
  }
  return chipNavData;
};

export const chipsDataForAllTema = (
  chipsData: chipsDataAllQueryResponse["chipsDataAll"]
): ChipsData => {
  console.log("#### before processing");
  console.log("chipsData", chipsData);
  const chipNavData: ChipsData = [];
  for (const entry of chipsData) {
    for (const undertema of entry.undertema) {
      chipNavData.push({
        "undertema-title": undertema.title,
        "innholdstype-title": entry.innholdstype,
      });
    }
  }
  console.log("#### after processing");
  console.log("chipNavData", chipNavData);
  return chipNavData;
};
