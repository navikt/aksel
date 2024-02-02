import React, { useState } from "react";
import { FloatingProvider } from "./Floating.context";
import type { Measurable } from "./Floating.types";

interface FloatingProps {
  children: React.ReactNode;
}

export const Floating = ({ children }: FloatingProps) => {
  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <FloatingProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </FloatingProvider>
  );
};
