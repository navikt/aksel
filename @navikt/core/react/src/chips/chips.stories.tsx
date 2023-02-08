/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Chips } from ".";

export default {
  title: "ds-react/Chips",
  component: Chips,
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: ["toggle", "removable"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

export const Default = {
  render: (props) => {
    const [selected, setSelected] = useState(["Dansk", "Svensk"]);
    const [filter, setFilter] = useState(options);

    if (props.type === "toggle") {
      return (
        <Chips size={props.size ?? "medium"}>
          {options.map((c) => (
            <Chips.Toggle
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
            </Chips.Toggle>
          ))}
        </Chips>
      );
    }

    return (
      <Chips size={props.size ?? "medium"}>
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
  },
};

export const Toggle = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <Chips>
      {options.map((c, y) => (
        <Chips.Toggle
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
        </Chips.Toggle>
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
          <Chips.Toggle
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
          </Chips.Toggle>
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
          <Chips.Toggle
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
          </Chips.Toggle>
        ))}
      </Chips>
    </div>
  );
};
