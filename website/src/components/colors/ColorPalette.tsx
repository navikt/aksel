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
const colorSearch = (base: string) => {
  const colors: { color: Color; name: string }[] = [];
  for (let i = 80; i >= -80; i -= 20) {
    colors.push({
      color: Color(vars[name(base, i).replace("@", "")]),
      name: name(base, i),
    });
  }
  return colors;
};

const ColorPalette = ({ onClick }: PaletteProps) => {
  return (
    <div className="color__palette">
      {Object.keys(palette).map((colorVar) => {
        return (
          <div className="color__palette--group" key={colorVar}>
            {colorSearch(colorVar).map((col, ii) => {
              return (
                <ColorSample
                  key={col.name}
                  name={col.name}
                  color={col.color.hex()}
                  onClick={() => onClick({ name: col.name, color: col.color })}
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
