import React from "react";
import { Animation } from "..";

import * as TestAnimations from "../barnepensjon";

import "./animation.css";

export default {
  title: "ds-react-navno/illustration",
  argTypes: {
    isHovering: {
      name: "isHovering",
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "demo description",
    },
    isActive: {
      name: "isActive",
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "demo description",
    },
  },
};

export const All = (props) => {
  const { isHovering, isActive } = props;
  return (
    <>
      <h2>Animation</h2>
      <Animation
        hoverAnimation={TestAnimations.Hover}
        activeAnimation={TestAnimations.Active}
        isHovering={isHovering}
        isActive={isActive}
        className={`animation ${isActive ? "activeInvert" : ""}`}
      />
    </>
  );
};
