import React from "react";
import { LayoutGrid } from "./LayoutGrid";

export default {
  title: "ds-react/LayoutGrid",
  component: LayoutGrid,
  argTypes: {},
};

export const Default = () => {
  return (
    <LayoutGrid>
      <LayoutGrid.Cell>Cell 1</LayoutGrid.Cell>
      <LayoutGrid.Cell>Cell 2</LayoutGrid.Cell>
    </LayoutGrid>
  );
};
