import { useMemo } from "react";
import { VStack } from "@navikt/ds-react";
import { ChipsData } from "@/layout/god-praksis-page/interface";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";
import ChipNav from "./ChipNav";

export type ChipsRenderData = { title: string; count: number }[];

const countUniques = (
  type: "innholdstype" | "undertema",
  data: ChipsData,
  query: string,
  comparisonQuery: string,
): ChipsRenderData => {
  const lens =
    type === "innholdstype" ? "innholdstype-title" : "undertema-title";

  const lensFlipped =
    type === "innholdstype" ? "undertema-title" : "innholdstype-title";

  const map = new Map<string, number>();

  data.forEach((entry) => {
    let add = false;
    if (comparisonQuery && query) {
      add = entry[lens] === query;
    }
    if (comparisonQuery && !query) {
      add = entry[lensFlipped] === comparisonQuery;
    } else if (comparisonQuery && query) {
      add = entry[lensFlipped] === comparisonQuery && entry[lens] === query;
    } else {
      add = true;
    }

    const count = map.get(entry[lens]) || 0;
    map.set(entry[lens], count + (add ? 1 : 0));
  });

  const chipData = [];
  for (const [key, value] of map.entries()) {
    chipData.push({ title: key, count: value });
  }
  return chipData;
};

type ChipsGroupProps = { data: ChipsData; showTema: boolean };

function ChipsGroup(props: ChipsGroupProps) {
  const { innholdstypeQuery, undertemaQuery } = useGpQuery();

  const list = useMemo(() => {
    return {
      innholdstype: countUniques(
        "innholdstype",
        props.data,
        innholdstypeQuery,
        undertemaQuery,
      ),
      undertema: countUniques(
        "undertema",
        props.data,
        undertemaQuery,
        innholdstypeQuery,
      ),
    };
  }, [props.data, innholdstypeQuery, undertemaQuery]);

  return (
    <VStack gap="4">
      {props.showTema && <ChipNav type="undertema" data={list.undertema} />}
      <ChipNav type="innholdstype" data={list.innholdstype} />
    </VStack>
  );
}

export default ChipsGroup;
