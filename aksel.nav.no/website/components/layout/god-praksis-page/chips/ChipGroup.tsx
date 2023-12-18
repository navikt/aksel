import React, { useEffect } from "react";
import { VStack } from "@navikt/ds-react";
import { ChipsData } from "@/layout/god-praksis-page/types";
import ChipNav from "./ChipNav";

type ChipsGroupProps = { data: ChipsData; showTema: boolean };

function ChipsGroup(props: ChipsGroupProps) {
  console.log(props.data);
  const [undertemaSelection, setUndertemaSelection] = React.useState<string>();
  const [innholdstypeSelection, setInnholdstypeSelection] =
    React.useState<string>();

  const [filteredUndertema, setFilteredUndertema] = React.useState([]);
  const [filteredInnholdstype, setFilteredInnholdstype] = React.useState([]);

  useEffect(() => {
    if (undertemaSelection) {
      setFilteredUndertema(
        props.data.filter((entry) => {
          return entry["undertema-title"] === undertemaSelection;
        })
      );
    } else {
      setFilteredUndertema(props.data);
    }
    if (innholdstypeSelection) {
      setFilteredInnholdstype(
        props.data.filter((entry) => {
          return entry["innholdstype-title"] === innholdstypeSelection;
        })
      );
    } else {
      setFilteredInnholdstype(props.data);
    }
  }, [props.data, undertemaSelection, innholdstypeSelection]);

  return (
    <VStack gap="4">
      {props.showTema && (
        <ChipNav
          type="undertema"
          data={filteredInnholdstype}
          setSelection={setUndertemaSelection}
        />
      )}
      <ChipNav
        type="innholdstype"
        data={filteredUndertema}
        setSelection={setInnholdstypeSelection}
      />
    </VStack>
  );
}

export default ChipsGroup;
