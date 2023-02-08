import { addons } from "@storybook/addons";
import NavTheme from "./theme.js";
/* import logoUrl from "./public/logo.svg"; */

addons.setConfig({
  theme: NavTheme,
});

/* const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", logoUrl);
document.head.appendChild(link); */
