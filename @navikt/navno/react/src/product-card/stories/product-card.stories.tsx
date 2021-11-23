import React from "react";
import { LargeCard, MicroCard, MiniCard } from "..";

import hoverAnimation from "../../animation/barnepensjon/hover";
import activeAnimation from "../../animation/barnepensjon/active";

export default {
  title: "ds-react-navno/product-card",
};

export const All = () => {
  return (
    <>
      <h2>Micro Card</h2>
      <MicroCard href="#">Jeg er alene med barn</MicroCard>
      <h2>Mini Card</h2>
      <MiniCard
        href="#"
        title="Utvidet barnetrygd"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
      />
      <h2>Large Card</h2>
      <LargeCard
        href="#"
        title="Utvidet barnetrygd"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        category="Pengestøtte"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
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

export const MiniCardStory = () => {
  return (
    <>
      <MiniCard
        href="#"
        title="Utvidet barnetrygd"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
      />
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
