import Color, { type Coords } from "colorjs.io";
import type { GlobalColorScale } from "../../../internal-types";
import { AkselColorRole, AkselColorTheme } from "../../../types";
import { GlobalColorEntry } from "../../tokens.util";
import { GlobalConfigWithoutAlpha } from "./colors.types";
import { semanticRootTokens } from "./semantic-root.tokens";

type GlobalConfigWithAlpha = Record<
  Extract<AkselColorRole, "neutral">,
  Record<GlobalColorScale, GlobalColorEntry>
> &
  Record<
    Exclude<AkselColorRole, "neutral">,
    Record<Exclude<GlobalColorScale, "000">, GlobalColorEntry>
  >;

/**
 * To avoid having to use 3rd party websites for generating alpha tokens,
 * we add alpha tokens by calulating them ourselves.
 */
export function globalConfigWithAlphaTokens({
  config: globalConfig,
  theme,
}: {
  config: GlobalConfigWithoutAlpha;
  theme: AkselColorTheme;
}): GlobalConfigWithAlpha {
  const localConfig = structuredClone(globalConfig) as GlobalConfigWithAlpha;

  Object.keys(globalConfig).forEach((key) => {
    const _key = key as AkselColorRole;
    const scopedConfig = localConfig[_key];

    scopedConfig["100A"] = {
      ...scopedConfig?.["100"],
      value: createAlphaColor(scopedConfig["100"].value, theme),
    };
    scopedConfig["200A"] = {
      ...scopedConfig["200"],
      value: createAlphaColor(scopedConfig["200"].value, theme),
    };
    scopedConfig["300A"] = {
      ...scopedConfig["300"],
      value: createAlphaColor(scopedConfig["300"].value, theme),
    };
    scopedConfig["400A"] = {
      ...scopedConfig["400"],
      value: createAlphaColor(scopedConfig["400"].value, theme),
    };
  });

  return localConfig;
}

function createAlphaColor(targetColor: string, theme: AkselColorTheme) {
  const backgroundColor = semanticRootTokens(theme).bg.default.value;

  const targetCoords = new Color(targetColor).to("srgb").coords;
  const backgroundCoords = new Color(backgroundColor).to("srgb").coords;

  const [r, g, b, a] = getAlphaColor(
    parseAndValidateCoords(targetCoords),
    parseAndValidateCoords(backgroundCoords),
    255,
    255,
  );

  return formatHex(new Color("srgb", [r, g, b], a).toString({ format: "hex" }));
}

function parseAndValidateCoords(coords: Coords): number[] {
  const parsedCoords: number[] = [];

  for (const coord of coords) {
    if (coord === null) {
      throw new Error(`Color coordinate is undefined: ${coord}`);
    }
    parsedCoords.push(coord);
  }

  return parsedCoords;
}

// target = background * (1 - alpha) + foreground * alpha
// alpha = (target - background) / (foreground - background)
// Expects 0-1 numbers for the RGB channels
function getAlphaColor(
  targetRgb: number[],
  backgroundRgb: number[],
  rgbPrecision: number,
  alphaPrecision: number,
  targetAlpha?: number,
) {
  const [tr, tg, tb] = targetRgb.map((c) => Math.round(c * rgbPrecision));
  const [br, bg, bb] = backgroundRgb.map((c) => Math.round(c * rgbPrecision));

  if (
    tr === undefined ||
    tg === undefined ||
    tb === undefined ||
    br === undefined ||
    bg === undefined ||
    bb === undefined
  ) {
    throw Error("Color is undefined");
  }

  // Is the background color lighter, RGB-wise, than target color?
  // Decide whether we want to add as little color or as much color as possible,
  // darkening or lightening the background respectively.
  // If at least one of the bits of the target RGB value
  // is lighter than the background, we want to lighten it.
  let desiredRgb = 0;
  if (tr > br) {
    desiredRgb = rgbPrecision;
  } else if (tg > bg) {
    desiredRgb = rgbPrecision;
  } else if (tb > bb) {
    desiredRgb = rgbPrecision;
  }

  const alphaR = (tr - br) / (desiredRgb - br);
  const alphaG = (tg - bg) / (desiredRgb - bg);
  const alphaB = (tb - bb) / (desiredRgb - bb);

  const isPureGray = [alphaR, alphaG, alphaB].every(
    (alpha) => alpha === alphaR,
  );

  // No need for precision gymnastics with pure grays, and we can get cleaner output
  if (!targetAlpha && isPureGray) {
    // Convert back to 0-1 values
    const V = desiredRgb / rgbPrecision;
    return [V, V, V, alphaR] as const;
  }

  const clampRgb = (n: number) =>
    Number.isNaN(n) ? 0 : Math.min(rgbPrecision, Math.max(0, n));
  const clampA = (n: number) =>
    Number.isNaN(n) ? 0 : Math.min(alphaPrecision, Math.max(0, n));
  const maxAlpha = targetAlpha ?? Math.max(alphaR, alphaG, alphaB);

  const A = clampA(Math.ceil(maxAlpha * alphaPrecision)) / alphaPrecision;
  let R = clampRgb(((br * (1 - A) - tr) / A) * -1);
  let G = clampRgb(((bg * (1 - A) - tg) / A) * -1);
  let B = clampRgb(((bb * (1 - A) - tb) / A) * -1);

  R = Math.ceil(R);
  G = Math.ceil(G);
  B = Math.ceil(B);

  const blendedR = blendAlpha(R, A, br);
  const blendedG = blendAlpha(G, A, bg);
  const blendedB = blendAlpha(B, A, bb);

  // Correct for rounding errors in light mode
  if (desiredRgb === 0) {
    if (tr <= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1;
    }

    if (tg <= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1;
    }

    if (tb <= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1;
    }
  }

  // Correct for rounding errors in dark mode
  if (desiredRgb === rgbPrecision) {
    if (tr >= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1;
    }

    if (tg >= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1;
    }

    if (tb >= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1;
    }
  }

  // Convert back to 0-1 values
  R = R / rgbPrecision;
  G = G / rgbPrecision;
  B = B / rgbPrecision;

  return [R, G, B, A] as const;
}

function blendAlpha(
  foreground: number,
  alpha: number,
  background: number,
  round = true,
) {
  if (round) {
    return (
      Math.round(background * (1 - alpha)) + Math.round(foreground * alpha)
    );
  }

  return background * (1 - alpha) + foreground * alpha;
}

function formatHex(str: string) {
  if (!str.startsWith("#")) {
    return str;
  }

  if (str.length === 4) {
    const hash = str.charAt(0);
    const r = str.charAt(1);
    const g = str.charAt(2);
    const b = str.charAt(3);
    return hash + r + r + g + g + b + b;
  }

  if (str.length === 5) {
    const hash = str.charAt(0);
    const r = str.charAt(1);
    const g = str.charAt(2);
    const b = str.charAt(3);
    const a = str.charAt(4);
    return hash + r + r + g + g + b + b + a + a;
  }

  return str;
}
