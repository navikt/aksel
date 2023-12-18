import { useMemo } from "react";
import { VStack } from "@navikt/ds-react";
import { ChipsData } from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";
import ChipNav from "./ChipNav";

type ChipsGroupProps = { data: ChipsData; showTema: boolean };

function ChipsGroup(props: ChipsGroupProps) {
  const { innholdstypeQuery, undertemaQuery } = useGpQuery();

  const list = useMemo(() => {
    return {
      innholdstype: innholdstypeQuery
        ? props.data.filter((entry) => {
            return entry["innholdstype-title"] === innholdstypeQuery;
          })
        : props.data,
      undertema: undertemaQuery
        ? props.data.filter((entry) => {
            return entry["undertema-title"] === undertemaQuery;
          })
        : props.data,
    };
  }, [props.data, innholdstypeQuery, undertemaQuery]);

  return (
    <VStack gap="4">
      {props.showTema && <ChipNav type="undertema" data={list.innholdstype} />}
      <ChipNav type="innholdstype" data={list.undertema} />
    </VStack>
  );
}

export default ChipsGroup;
