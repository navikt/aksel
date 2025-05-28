import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Chips } from ".";

const meta: Meta<typeof Chips> = {
  title: "ds-react/Chips",
  component: Chips,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Chips>;

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

export const Toggle = ({ size }) => {
  const [selected, setSelected] = useState<number[]>([2, 4]);
  return (
    <div className="colgap">
      <Chips size={size}>
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
      <Chips size={size}>
        {options.map((c, y) => (
          <Chips.Toggle
            variant="neutral"
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
Toggle.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["medium", "small"],
  },
};

export const ToggleNoCheckmark = () => {
  const [selected, setSelected] = useState<number>(2);
  return (
    <div className="colgap">
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
      <Chips>
        {options.map((c, y) => (
          <Chips.Toggle
            variant="neutral"
            selected={selected === y}
            checkmark={false}
            onClick={() => setSelected(y)}
            key={y}
          >
            {c}
          </Chips.Toggle>
        ))}
      </Chips>
    </div>
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

export const Regular = (props: any) => {
  const [selected, setSelected] = useState<number[]>([2]);
  return (
    <div className="colgap">
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
    </div>
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
  <div>
    <div>
      <Regular />
    </div>
    <div data-color="brand-magenta">
      <Regular />
    </div>
    <div>
      <Regular data-color="brand-magenta" />
    </div>
  </div>
);

export const Chromatic: Story = {
  render: () => (
    <div>
      <div>
        <h2>Default</h2>
        <Default />
      </div>
      <div>
        <h2>Toggle</h2>
        <h3>Medium</h3>
        <Toggle size="medium" />
        <h3>Small</h3>
        <Toggle size="small" />
      </div>
      <div>
        <h2>Removable</h2>
        <Removable />
      </div>
      <div>
        <h2>Regular</h2>
        <Regular />
      </div>
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
