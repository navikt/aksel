import React, { useState } from "react";
import { Chips } from ".";

export default {
  title: "ds-react/Chips",
  component: Chips,
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: ["filter", "removable"],
      },
    },
  },
};

const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

export const Default = (props) => {
  const [selected, setSelected] = useState(["Dansk", "Svensk"]);
  const [filter, setFilter] = useState(options);

  if (props.type === "filter") {
    return (
      <Chips>
        {options.map((c) => (
          <Chips.Filter
            selected={selected.includes(c)}
            key={c}
            onClick={() =>
              setSelected(
                selected.includes(c)
                  ? selected.filter((x) => x !== c)
                  : [...selected, c]
              )
            }
          >
            {c}
          </Chips.Filter>
        ))}
      </Chips>
    );
  }

  return (
    <Chips>
      {filter.map((c) => (
        <Chips.Removable
          key={c}
          onClick={() => setFilter((x) => x.filter((y) => y !== c))}
        >
          {c}
        </Chips.Removable>
      ))}
    </Chips>
  );
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

export const Regular = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className="colgap">
      <Chips>
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Removable key={y}>Input</Chips.Removable>
        ))}
      </Chips>
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
