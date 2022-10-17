import { List, Root, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { Chips } from ".";

export default {
  title: "ds-react/Chips",
  component: Chips,
  argTypes: {},
};

export const Filter = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <Chips>
      {new Array(4).fill(1).map((_, y) => (
        <Chips.Filter
          selected={selected.includes(y)}
          onClick={() =>
            setSelected(
              selected.includes(y)
                ? selected.filter((x) => x !== y)
                : [...selected, y]
            )
          }
          key={y}
        >
          Filter
        </Chips.Filter>
      ))}
    </Chips>
  );
};

export const Removable = () => {
  return (
    <div className="colgap">
      <Chips>
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Removable key={y}>Removable</Chips.Removable>
        ))}
      </Chips>
      <Chips>
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Removable variant="neutral" key={y}>
            Removable
          </Chips.Removable>
        ))}
      </Chips>
    </div>
  );
};

export const Small = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className="colgap">
      <Chips size="small">
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Removable key={y}>Input</Chips.Removable>
        ))}
      </Chips>
      <Chips size="small">
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Filter
            selected={selected.includes(y)}
            onClick={() =>
              setSelected(
                selected.includes(y)
                  ? selected.filter((x) => x !== y)
                  : [...selected, y]
              )
            }
            key={y}
          >
            Filter
          </Chips.Filter>
        ))}
      </Chips>
    </div>
  );
};

export const AsTabs = () => {
  const [selected, setSelected] = useState("chip1");
  return (
    <Root onValueChange={setSelected}>
      <List asChild>
        <Chips>
          <TabsTrigger asChild value="chip1">
            <Chips.Filter selected={selected === "chip1"}>Chip1</Chips.Filter>
          </TabsTrigger>
          <TabsTrigger asChild value="chip2">
            <Chips.Filter selected={selected === "chip2"}>Chip2</Chips.Filter>
          </TabsTrigger>
          <TabsTrigger asChild value="chip3">
            <Chips.Filter selected={selected === "chip3"}>Chip3</Chips.Filter>
          </TabsTrigger>
        </Chips>
      </List>
    </Root>
  );
};
