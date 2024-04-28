import React, { useState } from "react";
import { FloatingProvider } from "./Floating.context";
import type { Measurable } from "./Floating.types";
import { FloatingAnchor } from "./parts/Anchor";
import { FloatingContent } from "./parts/Content";

interface FloatingProps {
  children: React.ReactNode;
}

interface FloatingComponent extends React.FC<FloatingProps> {
  Anchor: typeof FloatingAnchor;
  Content: typeof FloatingContent;
}

export const Floating: FloatingComponent = ({ children }: FloatingProps) => {
  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <FloatingProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </FloatingProvider>
  );
};

Floating.Anchor = FloatingAnchor;
Floating.Content = FloatingContent;

export default Floating;
