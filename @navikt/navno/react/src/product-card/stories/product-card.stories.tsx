import React from "react";
import { Barnepensjon } from "..";

export default {
  title: "ds-react-navno/product-card",
  argTypes: {
    size: {
      options: ["large", "mini", "micro"],
      control: { type: "select" },
    },
    text: {
      control: { type: "text" },
    },
  },
};
interface StoryProps {
  size: "large" | "mini" | "micro";
  text: string;
}

export const ProductCardStory = ({ size = "large", text }: StoryProps) => {
  return (
    <>
      <h1>Product card</h1>
      <Barnepensjon href="http://www.nav.no" text={text} size={size} />
    </>
  );
};
