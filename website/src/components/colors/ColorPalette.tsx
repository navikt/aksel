import React from "react";
import Color from "color";
import palette from "../assets/data/palette";
import ColorSample from "./ColorSample";
import "./styles.less";

interface PaletteProps {
  onClick: ({ name: string, color: Color }) => void;
}

const white = Color("#FFFFFF");
const black = Color("#3E3832");

const variations = (baseColor, modifyer) => {
  const colors = [];
  for (let i = 80; i > 0; i -= 20) {
    colors.push(baseColor.mix(modifyer, i / 100));
  }
  return colors;
};

const colorName = (base, i) => {
  if (i === 4) return base;
  return i < 4 ? `${base}Darken${80 - i * 20}` : `${base}Lighten${i * 20 - 80}`;
};

const ColorPalette = ({ onClick }: PaletteProps) => {
  return (
    <div className="color__palette">
      {Object.keys(palette).map((colorVar) => {
        const color = Color(palette[colorVar]);
        const lightVersions = variations(color, white);
        lightVersions.push(color);
        const darkVersions = variations(color, black);
        const group = lightVersions.concat(darkVersions.reverse()).reverse();

        return (
          <div className="color__palette--group" key={colorVar}>
            {group.map((col, ii) => {
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
