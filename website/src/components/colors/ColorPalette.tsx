import React from "react";
import Color from "color";
import ColorSample from "./ColorSample";
import vars from "nav-frontend-core";
import "./color-palette.less";

interface PaletteProps {
  onClick: ({ name: string, color: Color }) => void;
}

const ColorPalette = ({ onClick }: PaletteProps) => (
  <div className="color__palette">
    {[
      "redError",
      "navOransje",
      "navLimeGronn",
      "navGronn",
      "navLilla",
      "navDypBla",
      "navBla",
      "navLysBla",
    ].map((baseColor) => (
      <div key={baseColor}>
        {[
          "Darken80",
          "Darken60",
          "Darken40",
          "Darken20",
          "",
          "Lighten20",
          "Lighten40",
          "Lighten60",
          "Lighten80",
        ]
          .map((suffix) => `${baseColor}${suffix}`)
          .map((color) => ({
            name: `@${color}`,
            color: Color(vars[color]),
          }))
          .map(({ name, color }) => (
            <ColorSample
              key={name}
              name={name}
              color={color.hex()}
              onClick={() => onClick({ name, color })}
            />
          ))}
      </div>
    ))}
  </div>
);

export default ColorPalette;
