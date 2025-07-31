import { create } from "@storybook/theming";
import logoUrl from "./public/logo.svg";

export default create({
  brandImage: logoUrl,
  // TODO: (stw) Reset to 'base: "light"'
  // base: "light",
  brandTitle: "Aksel",
});
