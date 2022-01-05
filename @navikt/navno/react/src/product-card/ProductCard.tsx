import React from "react";

import { BaseCard } from "./base-card/BaseCard";
import { ProductCardProps } from "./types";
import { getCardText } from "./locale/";

import * as Animations from "../animation/Library";

export default ({
  language = "no",
  customText,
  size,
  href,
  productName,
}: ProductCardProps) => {
  const { title, text, category } = getCardText(productName, language);

  const animation = Animations[productName];

  if (!animation) {
    return null;
  }

  return (
    <BaseCard
      title={title}
      href={href}
      size={size}
      text={customText || text}
      category={category}
      hoverAnimation={animation.Hover}
      activeAnimation={animation.Active}
    />
  );
};
