import React from "react";
import { Columns } from ".";

export default {
  title: "ds-react/Columns",
  component: Columns,
};

export const Default = {
  render: () => (
    <Columns>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

function Placeholder({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "20rem",
        width: "auto",
      }}
    >
      {text}
    </div>
  );
}
