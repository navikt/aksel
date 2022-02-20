import React from "react";

import { CardSize } from "./types";

import LargeCard from "./sizes/LargeCard";
import MiniCard from "./sizes/MiniCard";
import MicroCard from "./sizes/MicroCard";

export interface BaseCardProps {
  category: string;
  hoverAnimation?: any;
  href: string;
  size: CardSize;
  text: string;
  title: string;
}

export const BaseCard = ({
  href,
  size,
  hoverAnimation,
  title,
  text,
  category,
}: BaseCardProps) => {
  if (size === "micro") {
    return (
      <MicroCard href={href} type="product">
        {title}
      </MicroCard>
    );
  }

  if (size === "mini") {
    return (
      <MiniCard
        title={title}
        type="product"
        href={href}
        hoverAnimation={hoverAnimation}
      />
    );
  }

  return (
    <LargeCard
      href={href}
      title={title}
      type="product"
      text={text}
      category={category}
      hoverAnimation={hoverAnimation}
    />
  );
};
