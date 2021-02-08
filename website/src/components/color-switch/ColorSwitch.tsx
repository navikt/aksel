import React, { useEffect, useState } from "react";
import cl from "classnames";
import { Close } from "@navikt/ds-icons";
import "./index.css";
import "@navikt/ds-css/button/index.css";

const cls = (selected, none = false) => {
  return cl("colorswitch__button", "navds-button", "navds-button--secondary", {
    "colorswitch__button--none": none,
    "colorswitch__button--selected": selected,
  });
};

interface ColorSwtichProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange: (color) => void;
  colors?: string[];
}

const ColorSwitch = ({ onChange, colors, ...props }: ColorSwtichProps) => {
  const defaultColors = ["#FFFFFF", "#000000", "#0067C5"];
  const [selectedColor, setSelectedColor] = useState("currentColor");

  const onColorChange = (color) => {
    setSelectedColor(color);
    onChange(color);
  };

  useEffect(() => {
    colors && setSelectedColor(colors[0]);
  }, [colors]);

  const avaliableColors = colors ? colors : defaultColors;
  return (
    <div className="colorswitch" {...props}>
      {!colors && (
        <button
          className={cls(selectedColor === "currentColor", true)}
          onClick={() => onColorChange("currentColor")}
          aria-label="Sett farge til currentColor"
          aria-pressed={selectedColor === "currentColor"}
        >
          <Close className="colorswitch__closeicon" />
        </button>
      )}
      {avaliableColors.map((c) => (
        <button
          key={c}
          className={cls(selectedColor === c)}
          style={{ backgroundColor: c }}
          onClick={() => onColorChange(c)}
          aria-label={`Sett farge til hex ${c}`}
          aria-pressed={selectedColor === c}
        />
      ))}
    </div>
  );
};

export default ColorSwitch;
