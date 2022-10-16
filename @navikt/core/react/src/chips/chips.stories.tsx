import React from "react";
import { Chips } from ".";

export default {
  title: "ds-react/Chips",
  component: Chips,
  argTypes: {},
};

export const Filter = () => {
  return (
    <Chips>
      {new Array(4).fill(1).map((_, y) => (
        <Chips.Filter key={y}>Filter</Chips.Filter>
      ))}
    </Chips>
  );
};

export const Input = () => {
  return (
    <Chips>
      {new Array(4).fill(1).map((_, y) => (
        <Chips.Input key={y}>Input</Chips.Input>
      ))}
    </Chips>
  );
};

export const Small = () => {
  return (
    <div className="colgap">
      <Chips size="small">
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Input key={y}>Input</Chips.Input>
        ))}
      </Chips>
      <Chips size="small">
        {new Array(4).fill(1).map((_, y) => (
          <Chips.Filter key={y}>Filter</Chips.Filter>
        ))}
      </Chips>
    </div>
  );
};
