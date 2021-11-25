import React from "react";
import { LargeCard, MicroCard, MiniCard } from "..";

import * as Animation from "../../animation/barnepensjon";
import * as Pictogram from "../../pictogram/gjenlevendepensjon";

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
        hoverAnimation={Animation.Hover}
        activeAnimation={Animation.Active}
        type="situation"
      />
      <h2>LargeCard</h2>
      <LargeCard
        activeAnimation={Animation.Active}
        category="Pengestøtte"
        hoverAnimation={Animation.Hover}
        href="#"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        title="Utvidet barnetrygd"
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
        hoverAnimation={Animation.Hover}
        activeAnimation={Animation.Active}
        type="situation"
      />
      <MiniCard
        href="#"
        title="Gjenlevendepensjon"
        hoverAnimation={Animation.Hover}
        activeAnimation={Animation.Active}
        type="product"
      />
      <MiniCard
        href="#"
        title="Finn ut hva du kan ha rett til når du er alene med barn"
        hoverAnimation={Animation.Hover}
        activeAnimation={Animation.Active}
        type="tool"
      />
      <h2>MiniCard (med statisk pictogram)</h2>
      <MiniCard
        href="#"
        title="Finn ut hva du kan ha rett til når du er alene med barn"
        staticFront={Pictogram.Front}
        staticBack={Pictogram.Back}
        type="tool"
      />
    </>
  );
};

export const LargeCardStory = () => {
  return (
    <>
      <h1>LargeCard</h1>
      <LargeCard
        href="#"
        title="Utvidet barnetrygd"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        category="Pengestøtte"
        hoverAnimation={Animation.Hover}
        activeAnimation={Animation.Active}
        type="product"
      />
      <h2>LargeCard (med statisk pictogram)</h2>
      <LargeCard
        category="Pengestøtte"
        staticFront={Pictogram.Front}
        staticBack={Pictogram.Back}
        href="#"
        text="Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år."
        title="Utvidet barnetrygd"
        type="product"
      />
    </>
  );
};
