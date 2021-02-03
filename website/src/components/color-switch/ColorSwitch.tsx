import React, { useState } from "react";
import cl from "classnames";
import { Close, Success, SuccessFilled } from "@navikt/ds-icons";
import "./index.css";
import "@navikt/ds-css/button/index.css";

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
  const colors = ["#FFFFFF", "#000000", "#0067C5"];
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
      >
        <Close className="colorswitch__closeicon" />
      </button>
      {colors.map((c) => (
        <button
          className={cls(selectedColor === c)}
          style={{ backgroundColor: c }}
          onClick={() => onColorChange(c)}
        ></button>
      ))}
    </div>
  );
};

export default ColorSwitch;
