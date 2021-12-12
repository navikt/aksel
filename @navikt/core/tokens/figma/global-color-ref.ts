import Color from "color";

export type ColorT = {
  name: string;
  color: string;
};

const globalColorRefs = (colors: ColorT[]) => {
  const globalColors = colors.filter((c) => c.name.includes("-global-"));

  return colors.map((c) => {
    if (c.name.includes("-global-")) return c;

    const globalColor = globalColors.find(
      (g) => Color(g.color).string() === Color(c.color).string()
    );
    return globalColor ? { name: c.name, color: globalColor.name } : c;
  });
};

export default globalColorRefs;
