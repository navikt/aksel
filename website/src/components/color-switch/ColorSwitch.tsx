import React, { useState } from "react";
import cl from "classnames";
import { Close } from "@navikt/ds-icons";
import "./index.css";

const cls = (selected, none = false) => {
  return cl("colorswitch__button", "navds-button", "navds-button--secondary", {
    "colorswitch__button--none": none,
    "colorswitch__button--selected": selected,
  });
};

interface ColorSwtichProps {
  onChange: (color) => void;
}

const ColorSwitch = ({ onChange, ...props }: ColorSwtichProps) => {
  const colors = ["#FFFFFF", "#292929", "#0067C5"];
  const [selectedColor, setSelectedColor] = useState("currentColor");

  const onColorChange = (color) => {
    setSelectedColor(color);
    onChange(color);
  };
  return (
    <div className="colorswitch">
      <button
        className={cls(selectedColor === "currentColor", true)}
        onClick={() => onColorChange("currentColor")}
        aria-label="Sett farge til currentColor"
        aria-pressed={selectedColor === "currentColor"}
      >
        <Close className="colorswitch__closeicon" />
      </button>
      {colors.map((c) => (
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
