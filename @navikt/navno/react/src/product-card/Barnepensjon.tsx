import React from "react";

import { BaseCard, BaseCardProps } from "./baseCard/BaseCard";
import * as Animation from "../animation/barnepensjon";

export default ({ text, ...rest }: BaseCardProps) => {
  const defaultCardText =
    "Hvis du er barn og mister en eller begge foreldrene dine, kan du få økonomisk støtte. Pensjonen skal sikre deg inntekt til å leve og bo.";
  return (
    <BaseCard
      {...rest}
      text={text || defaultCardText}
      hoverAnimation={Animation.Hover}
      activeAnimation={Animation.Active}
    />
  );
};
