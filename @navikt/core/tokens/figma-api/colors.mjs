import { getLocalColors } from "./api.mjs";
import Color from "color";
import { prefix } from "./config.mjs";
import { colorFrames, colorPageName, colorElement } from "./config.mjs";

const parseName = (name) => {
  const split = name.toLowerCase().split("/");
  const group = split.shift();
  return `${prefix}-${group}-color-${split.join("-")}`;
};

const getColorRef = (color, colors) => {
  const globalColors = colors.filter((x) =>
    x.name.startsWith(`${prefix}-global`)
  );

  for (const x of globalColors) {
    if (Color(x.color).string() === Color(color).string()) {
      return `{${prefix}-${x.name}.value}`;
    }
  }

  return color;
};

export const getColors = async () => {
  const localColors = await getLocalColors();
  const colorPage = localColors.document.children.find(
    (x) => x.name === colorPageName
  );

  const allColors = [];

  colorFrames.forEach((token) =>
    colorPage.children
      .find((x) => x.name === token)
      ?.children.forEach((x) => {
        const syncElement = x.children.find((x) => x.name === colorElement);
        const bg = syncElement?.background?.[0];
        const fills = syncElement?.styles?.fills;

        if (!syncElement || !bg || !fills) return;

        const color = Color.rgb(
          bg.color.r * 255,
          bg.color.g * 255,
          bg.color.b * 255
        ).alpha(bg?.opacity ?? 1);

        allColors.push({
          color: color.toString(),
          name: parseName(localColors.styles[fills].name),
        });
      })
  );

  return allColors.reduce((newColors, current) => {
    const value = current.name.startsWith(`${prefix}-global`)
      ? current.color
      : getColorRef(current.color, allColors);
    return {
      ...newColors,
      [current.name]: value,
    };
  }, {});
};
