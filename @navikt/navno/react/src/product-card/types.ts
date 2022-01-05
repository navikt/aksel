export enum CardType {
  Product = "product",
  Situation = "situation",
  Tool = "tool",
}

export type CardSize = "large" | "mini" | "micro";

export enum Interaction {
  mouseenter = "mouseenter",
  mouseleave = "mouseleave",
  mousedown = "mousedown",
  mouseup = "mouseup",
  touchend = "touchend",
  touchstart = "touchstart",
  touchmove = "touchmove",
  touchcancel = "touchcancel",
}

export type ProductName = "barnepensjon" | "engangsstonad";

export type Language = "no" | "en";

export type CardLanguage = {
  title: string;
  text: string;
  category: string;
};

type CardProps = {
  customText: string;
  href: string;
  language?: Language;
  size: CardSize;
};

export interface ProductCardProps extends CardProps {
  productName: ProductName;
}
