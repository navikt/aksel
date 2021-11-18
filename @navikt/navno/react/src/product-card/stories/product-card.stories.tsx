import React from "react";
import { LargeCard, MicroCard } from "..";

export default {
  title: "ds-react-navno/product-card",
};

export const All = () => {
  return (
    <>
      <h2>Micro card</h2>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
      <h2>Product card</h2>
      <LargeCard
        href="#"
        title="Utvidet barnetrygd"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        category="Pengestøtte"
      />
    </>
  );
};

export const MicroCardStory = () => {
  return (
    <>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
    </>
  );
};

export const LargeCardStory = () => {
  return (
    <>
      <LargeCard
        href="#"
        title="Utvidet barnetrygd"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        category="Pengestøtte"
      />
    </>
  );
};
