import { create } from "@storybook/theming";
import logoUrl from "./public/logo.svg";

export default create({
  brandImage: logoUrl,
  base: "light",
  // Typography
  fontBase: '"Source Sans Pro", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#23262a",
  textInverseColor: "rgba(255,255,255,0.9)",

  colorSecondary: "rgba(0, 36, 58, 1)",
  colorPrimary: "rgba(153, 196, 221, 1)",

  barTextColor: "rgba(0, 91, 130, 1)",
  barSelectedColor: "rgba(0, 36, 58, 1)",

  brandTitle: "Aksel",
});
