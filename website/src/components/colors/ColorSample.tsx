import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import Color from "color";

import "./styles.less";

interface SampleProps {
  onClick: ({ name: string, color: Color }) => void;
  name: string;
  color: string;
}

const ColorSample = ({ name, color, onClick }: SampleProps) => {
  const pickedColor = useRef<Color>(Color(color));

  useEffect(() => {
    pickedColor.current = Color(color);
  }, [color]);

  return (
    <button
      className={classnames("color__sample", {
        "color__sample--light": pickedColor.current.isLight() || false,
      })}
      style={{
        background: pickedColor.current.hex(),
        borderColor: pickedColor.current.hex(),
      }}
      type="button"
      onClick={() => onClick({ name, color: pickedColor.current })}
    >
      <span>{name}</span>
      <span>{pickedColor.current.hex()}</span>
    </button>
  );
};

export default ColorSample;
