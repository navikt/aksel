import React from "react";

import { BaseCard, BaseCardProps } from "./baseCard/BaseCard";
import * as Animation from "../animation/barnepensjon";

export default (props: BaseCardProps) => {
  return (
    <BaseCard
      {...props}
      hoverAnimation={Animation.Hover}
      activeAnimation={Animation.Active}
    />
  );
};
