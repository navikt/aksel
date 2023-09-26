"use client";
import { useState } from "react";

export const InteractiveComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <button
      onClick={() => setCounter((x) => x + 1)}
      style={{ minWidth: "4rem" }}
    >
      {counter}
    </button>
  );
};
