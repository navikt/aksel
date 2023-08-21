import { create } from "@storybook/theming";
import logoUrl from "./public/logo.svg";

export default create({
  brandImage: logoUrl,
  base: "light",
  // Typography
  fontBase: '"Source Sans Pro", sans-serif',
  fontCode: "monospace",

  brandTitle: "Aksel",
});
