import React from "react";
import { ProductCard } from "..";
import { CardSize, ProductName } from "../types";

export default {
  title: "ds-react-navno/product-card",
  argTypes: {
    productName: {
      options: ["barnepensjon", "engangsstonad"],
      control: { type: "select" },
    },
    customText: {
      control: { type: "text" },
    },
  },
};

interface StoryProps {
  customText?: string;
  productName?: ProductName;
  size: CardSize;
}

export const ProductCards = ({
  customText,
  productName = "barnepensjon",
}: StoryProps) => {
  return (
    <>
      <h1>Product card</h1>
      <h2>Large card</h2>
      <ProductCard
        href="http://www.nav.no"
        customText={customText}
        size="large"
        productName={productName}
      />
      <h2>Mini card</h2>
      <ProductCard
        href="http://www.nav.no"
        customText={customText}
        size="mini"
        productName={productName}
      />
      <h2>Micro card</h2>
      <ProductCard
        href="http://www.nav.no"
        customText={customText}
        size="micro"
        productName={productName}
      />
    </>
  );
};
