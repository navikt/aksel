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
      {options.map((c, y) => (
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
          {c}
        </Chips.Filter>
      ))}
    </Chips>
  );
};

export const Removable = () => {
  return (
    <div className="colgap">
      <Chips>
        {options.map((c, y) => (
          <Chips.Removable key={y}>{c}</Chips.Removable>
        ))}
      </Chips>
      <Chips>
        {options.map((c, y) => (
          <Chips.Removable variant="neutral" key={y}>
            {c}
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
        {options.map((c, y) => (
          <Chips.Removable key={y}>{c}</Chips.Removable>
        ))}
      </Chips>
      <Chips>
        {options.map((c, y) => (
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
            {c}
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
        {options.map((c, y) => (
          <Chips.Removable key={y}>{c}</Chips.Removable>
        ))}
      </Chips>
      <Chips size="small">
        {options.map((c, y) => (
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
            {c}
          </Chips.Filter>
        ))}
      </Chips>
    </div>
  );
};
