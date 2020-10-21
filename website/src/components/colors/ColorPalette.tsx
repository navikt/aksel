import React from "react";
import Color from "color";
import palette from "../assets/data/palette";
import ColorSample from "./ColorSample";
import vars from "nav-frontend-core";
import "./styles.less";

interface PaletteProps {
  onClick: ({ name: string, color: Color }) => void;
}

const colorName = (base: string, i: number) => {
  if (i === 4) return base;
  return i < 4 ? `${base}Darken${80 - i * 20}` : `${base}Lighten${i * 20 - 80}`;
};

const name = (name: string, i: number) => {
  switch (true) {
    case i > 0:
      return `${name}Darken${i}`;
    case i < 0:
      return `${name}Lighten${-1 * i}`;
    case i === 0:
      return `${name}`;
    default:
      return "";
  }
};
const colorTest = (base: string) => {
  const colors = [];
  for (let i = 80; i >= -80; i -= 20) {
    colors.push(Color(vars[name(base, i).replace("@", "")]));
  }
  return colors;
};

const ColorPalette = ({ onClick }: PaletteProps) => {
  return (
    <div className="color__palette">
      {Object.keys(palette).map((colorVar) => {
        return (
          <div className="color__palette--group" key={colorVar}>
            {colorTest(colorVar).map((col, ii) => {
              const name = colorName(colorVar, ii);
              return (
                <ColorSample
                  key={name}
                  name={name}
                  color={col.hex()}
                  onClick={() => onClick({ name, color: col })}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ColorPalette;
