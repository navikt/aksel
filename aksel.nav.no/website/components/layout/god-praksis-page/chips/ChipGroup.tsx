import { useMemo } from "react";
import { VStack } from "@navikt/ds-react";
import { ChipsData } from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";
import ChipNav from "./ChipNav";

type ChipsGroupProps = { data: ChipsData; showTema: boolean };

function ChipsGroup(props: ChipsGroupProps) {
  const { innholdstypeQuery, undertemaQuery } = useGpQuery();

  const undertemaList = useMemo(
    () =>
      undertemaQuery
        ? props.data.filter((entry) => {
            return entry["undertema-title"] === undertemaQuery;
          })
        : props.data,
    [props.data, undertemaQuery]
  );

  const innholdstypeList = useMemo(
    () =>
      innholdstypeQuery
        ? props.data.filter((entry) => {
            return entry["innholdstype-title"] === innholdstypeQuery;
          })
        : props.data,
    [props.data, innholdstypeQuery]
  );

  return (
    <VStack gap="4">
      {props.showTema && <ChipNav type="undertema" data={undertemaList} />}
      <ChipNav type="innholdstype" data={innholdstypeList} />
    </VStack>
  );
}

export default ChipsGroup;
