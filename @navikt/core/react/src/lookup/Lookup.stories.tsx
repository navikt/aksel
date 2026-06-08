import React from "react";
import Lookup from "./Lookup";

const placements = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
];

export default {
  title: "ds-react/Lookup",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    placement: {
      defaultValue: "right",
      options: placements,
      control: { type: "radio" },
    },
  },
};

export const Default = () => {
  return <Lookup word="Lookup">Lookup component</Lookup>;
};

export const WithinASentence = () => {
  return (
    <p>
      This is an example of a <Lookup word="lookup">Lookup component</Lookup>{" "}
      within a sentence.
    </p>
  );
};

export const VeryLongWord = () => {
  return (
    <p style={{ maxWidth: "300px" }}>
      This is an example of a{" "}
      <Lookup word="very very long lookup word that never stops">
        Lookup component
      </Lookup>{" "}
      within a sentence.
    </p>
  );
};

export const HoverEffect = () => {
  return (
    <p>
      This is an example of a{" "}
      <Lookup word="lookup word" UNSAFEhoverEffect={true}>
        Lookup component
      </Lookup>{" "}
      within a sentence.
    </p>
  );
};
