import React, { useEffect, useState } from "react";
import classnames from "classnames";
import Color from "color";

import "./styles.less";

interface SampleProps {
  onClick: ({ name: string, color: Color }) => void;
  name: string;
  color: string;
}

const ColorSample = ({ name, color, onClick }: SampleProps) => {
  const [buttonColor, setButtonColor] = useState("#fff");

  useEffect(() => {
    setButtonColor(Color(color).hex());
  }, [color]);

  return (
    <button
      className={classnames("color__sample", {
        "color__sample--light": Color(buttonColor).isLight() || false,
      })}
      style={{
        background: buttonColor,
        borderColor: buttonColor,
      }}
      type="button"
      onClick={() => onClick({ name, color: Color(buttonColor) })}
    >
      <span>{name}</span>
      <span>{color}</span>
    </button>
  );
};

export default ColorSample;
