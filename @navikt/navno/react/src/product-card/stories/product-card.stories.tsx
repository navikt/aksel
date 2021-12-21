import React from "react";
import { Barnepensjon } from "..";

export default {
  title: "ds-react-navno/product-card",
};

export const ProductCardStory = () => {
  return (
    <>
      <h1>LargeCard</h1>
      <Barnepensjon
        href="http://www.nav.no"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        size="large"
      />
    </>
  );
};
