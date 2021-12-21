import React from "react";

import LargeCard from "./sizes/LargeCard";
import MiniCard from "./sizes/MiniCard";
import MicroCard from "./sizes/MicroCard";

export interface BaseCardProps {
  href: string;
  text?: string;
  hoverAnimation?: any;
  activeAnimation?: any;
  size: "large" | "mini" | "micro";
}

export const BaseCard = ({
  href,
  text,
  size,
  hoverAnimation,
  activeAnimation,
}: BaseCardProps) => {
  if (size === "micro") {
    return <MicroCard>Barnepensjon</MicroCard>;
  }

  if (size === "mini") {
    return <MiniCard title="Barnepensjon" type="product" />;
  }

  const cardText = text || "";

  return (
    <LargeCard
      href={href}
      title="Barnepensjon"
      type="product"
      text={cardText}
      category="pengestøtte"
      hoverAnimation={hoverAnimation}
      activeAnimation={activeAnimation}
    />
  );
};
