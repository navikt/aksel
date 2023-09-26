"use client";
import { Button } from "@navikt/ds-react";
import { useState } from "react";

/* export const InteractiveComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <button
      onClick={() => setCounter((x) => x + 1)}
      style={{ minWidth: "4rem", marginTop: "2rem" }}
    >
      {counter}
    </button>
  );
}; */

export const InteractiveComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Button
      onClick={() => setCounter((x) => x + 1)}
      style={{ marginTop: "2rem" }}
    >
      {counter}
    </Button>
  );
};
