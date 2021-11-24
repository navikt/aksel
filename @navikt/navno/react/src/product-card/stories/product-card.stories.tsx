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
      <h2>MicroCard</h2>
      <MicroCard href="#" type="situation">
        Er helt eller delvis alene med barn
      </MicroCard>
      <h2>MiniCard</h2>
      <MiniCard
        href="#"
        title="Utvidet barnetrygd"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="situation"
      />
      <h2>LargeCard</h2>
      <LargeCard
        href="#"
        title="Utvidet barnetrygd"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        category="Pengestøtte"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="product"
      />
    </>
  );
};

export const MicroCardStory = () => {
  return (
    <>
      <h1>MicroCard</h1>
      <h2>Single</h2>
      <MicroCard href="#" type="situation">
        Er helt eller delvis alene med barn
      </MicroCard>
      <h2>Multiple MicroCard</h2>
      <MicroCard href="#" type="product">
        Overgangsstønad for enslig mor eller far
      </MicroCard>
      <MicroCard href="#" type="product">
        Stønad til skolepenger for enslig mor eller far
      </MicroCard>
    </>
  );
};

export const MiniCardStory = () => {
  return (
    <>
      <h1>MiniCard</h1>
      <MiniCard
        href="#"
        title="Har mistet noen i nær familie"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="situation"
      />
      <MiniCard
        href="#"
        title="Gjenlevendepensjon"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="product"
      />
      <MiniCard
        href="#"
        title="Finn ut hva du kan ha rett til når du er alene med barn"
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="tool"
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
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
        type="product"
      />
    </>
  );
};
