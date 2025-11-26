import { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { Chips } from ".";
import { VStack } from "../layout/stack";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";

const meta: Meta<typeof Chips> = {
  title: "ds-react/Chips",
  component: Chips,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

const options = ["Norsk", "Dansk", "Svensk", "Tysk", "Spansk"];

export const Default = (props) => {
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
                  : [...selected, c],
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
};
Default.args = {
  type: "toggle",
};

Default.argTypes = {
  type: {
    control: { type: "radio" },
    options: ["toggle", "removable"],
  },
  size: {
    control: { type: "radio" },
    options: ["medium", "small"],
  },
};

export const Toggle = () => {
  const [selected, setSelected] = useState<number[]>([2, 4]);
  return (
    <Chips>
      {options.map((c, y) => (
        <Chips.Toggle
          selected={selected.includes(y)}
          onClick={() =>
            setSelected(
              selected.includes(y)
                ? selected.filter((x) => x !== y)
                : [...selected, y],
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

export const ToggleNoCheckmark = () => {
  const [selected, setSelected] = useState<number>(2);
  return (
    <Chips>
      {options.map((c, y) => (
        <Chips.Toggle
          selected={selected === y}
          checkmark={false}
          onClick={() => setSelected(y)}
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
    <Chips>
      {options.map((c, y) => (
        <Chips.Removable key={y}>{c}</Chips.Removable>
      ))}
    </Chips>
  );
};

export const Medium = (props: any) => {
  const [selected, setSelected] = useState<number[]>([2]);
  return (
    <VStack gap="space-16">
      <Chips>
        {options.map((c, y) => (
          <Chips.Removable key={y} {...props}>
            {c}
          </Chips.Removable>
        ))}
      </Chips>
      <Chips>
        {options.map((c, y) => (
          <Chips.Toggle
            {...props}
            selected={selected.includes(y)}
            onClick={() =>
              setSelected(
                selected.includes(y)
                  ? selected.filter((x) => x !== y)
                  : [...selected, y],
              )
            }
            key={y}
          >
            {c}
          </Chips.Toggle>
        ))}
      </Chips>
    </VStack>
  );
};

export const Small = () => {
  const [selected, setSelected] = useState<number[]>([2, 4]);
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
                  : [...selected, y],
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

export const ColorRole = () => (
  <VStack gap="space-24">
    <div>
      <Medium />
    </div>
    <div data-color="brand-magenta">
      <Medium />
    </div>
    <div>
      <Medium data-color="brand-beige" />
    </div>
  </VStack>
);

export const Chromatic = renderStoriesForChromatic({
  Medium,
  Small,
  ColorRole,
  ToggleNoCheckmark,
});
