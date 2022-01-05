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

const Template = ({
  customText,
  productName = "barnepensjon",
  size,
}: StoryProps) => {
  return (
    <>
      <h1>Product card</h1>
      <ProductCard
        href="http://www.nav.no"
        customText={customText}
        size={size}
        productName={productName}
      />
    </>
  );
};

const LargeCard = Template.bind({});
const MiniCard = Template.bind({});
const MicroCard = Template.bind({});

LargeCard.args = {
  size: "large",
};

MiniCard.args = {
  size: "mini",
};

MicroCard.args = {
  size: "micro",
};

LargeCard.parameters = { controls: { exclude: ["size"] } };
MiniCard.parameters = { controls: { exclude: ["size", "customText"] } };
MicroCard.parameters = { controls: { exclude: ["size", "customText"] } };

export { LargeCard, MiniCard, MicroCard };
