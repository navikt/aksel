import React from "react";
import classnames from "classnames";
import Color from "color";

import "./styles.less";

interface SampleProps {
  onClick: ({ name: string, color: Color }) => void;
  name: string;
  color: string;
}

const ColorSample = ({ name, color, onClick }: SampleProps) => {
  return (
    <button
      className={classnames("color__sample", {
        "color__sample--light": Color(color).isLight() || false,
      })}
      style={{
        background: color,
        borderColor: color,
      }}
      type="button"
      onClick={() => onClick({ name, color: Color(color) })}
    >
      <span>{name}</span>
      <span>{color}</span>
    </button>
  );
};

export default ColorSample;
