import React from "react";
import Lookup from "./Lookup";

export default {
  title: "ds-react/Lookup",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default = () => {
  return (
    <Lookup word="Lookup">
      A lookup component that shows a popover with an explanation when clicked.
    </Lookup>
  );
};
