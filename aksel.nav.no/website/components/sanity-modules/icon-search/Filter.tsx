import { AmplitudeEvents, logAmplitudeEvent } from "@/components";
import { Search, ToggleGroup } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";

export interface FilterT {
  value: string;
  toggle: string;
}

const Filter = ({
  onFilterChange,
}: {
  onFilterChange: (v: FilterT) => void;
}) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState("outline");

  useEffect(() => {
    if (toggle === "outline" && value === "") return;
    logAmplitudeEvent(AmplitudeEvents.ikonsok, {
      toggle,
      value,
    });
  }, [toggle, value]);

  return (
    <div className="mb-4 flex w-full max-w-md flex-col gap-4">
      <form
        role="search"
        className="relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search
          variant="simple"
          label="Søk i alle NAV-ikoner"
          value={value}
          onChange={(e) => {
            setValue(e);
            onFilterChange({
              value: e.toLowerCase(),
              toggle,
            });
          }}
          onClear={() => {
            setValue("");
            onFilterChange({
              value: "",
              toggle,
            });
          }}
          autoComplete="off"
        />
      </form>
      <ToggleGroup
        onChange={(v) => {
          setToggle(v);
          onFilterChange({
            value: value.toLowerCase(),
            toggle: v,
          });
        }}
        size="small"
        defaultValue="outline"
      >
        <ToggleGroup.Item value="outline">Outline</ToggleGroup.Item>
        <ToggleGroup.Item value="filled">Filled</ToggleGroup.Item>
        <ToggleGroup.Item value="ny">Nye ikoner</ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};
export default Filter;
