import { type ColorRoles, type GlobalColorScale } from "../../types";
import { type GlobalColorEntry } from "../tokens.util";

export const globalColorDarkModeConfigWithoutAlpha: Record<
  ColorRoles,
  Record<
    Exclude<GlobalColorScale, "000" | "100A" | "200A" | "300A" | "400A">,
    GlobalColorEntry
  >
> & {
  neutral: {
    [key in Extract<GlobalColorScale, "000">]: GlobalColorEntry;
  };
} = {
  neutral: {
    "000": {
      value: "black",
      type: "global-color",
      group: "neutral",
    },
    "100": { value: "#161d28", type: "global-color", group: "neutral" },
    "200": { value: "#1c232f", type: "global-color", group: "neutral" },
    "300": { value: "#242b37", type: "global-color", group: "neutral" },
    "400": { value: "#2e3641", type: "global-color", group: "neutral" },
    "500": { value: "#656d7b", type: "global-color", group: "neutral" },
    "600": { value: "#767e8c", type: "global-color", group: "neutral" },
    "700": { value: "#8a92a0", type: "global-color", group: "neutral" },
    "800": { value: "#949ba8", type: "global-color", group: "neutral" },
    "900": { value: "#a5acb6", type: "global-color", group: "neutral" },
    "1000": { value: "#dfe1e5", type: "global-color", group: "neutral" },
  },
  accent: {
    "100": { value: "#101d2d", type: "global-color", group: "accent" },
    "200": { value: "#152436", type: "global-color", group: "accent" },
    "300": { value: "#1a2c41", type: "global-color", group: "accent" },
    "400": { value: "#23374f", type: "global-color", group: "accent" },
    "500": { value: "#2e6db8", type: "global-color", group: "accent" },
    "600": { value: "#447fc9", type: "global-color", group: "accent" },
    "700": { value: "#5f94d8", type: "global-color", group: "accent" },
    "800": { value: "#6d9ddd", type: "global-color", group: "accent" },
    "900": { value: "#84aee6", type: "global-color", group: "accent" },
    "1000": { value: "#b0caf1", type: "global-color", group: "accent" },
  },
  success: {
    "100": { value: "#00230b", type: "global-color", group: "success" },
    "200": { value: "#032911", type: "global-color", group: "success" },
    "300": { value: "#0b3118", type: "global-color", group: "success" },
    "400": { value: "#183d24", type: "global-color", group: "success" },
    "500": { value: "#207c41", type: "global-color", group: "success" },
    "600": { value: "#368e52", type: "global-color", group: "success" },
    "700": { value: "#4ca265", type: "global-color", group: "success" },
    "800": { value: "#5eab72", type: "global-color", group: "success" },
    "900": { value: "#78ba87", type: "global-color", group: "success" },
    "1000": { value: "#a4d4ad", type: "global-color", group: "success" },
  },
  warning: {
    "100": { value: "#371100", type: "global-color", group: "warning" },
    "200": { value: "#3e1704", type: "global-color", group: "warning" },
    "300": { value: "#471f0c", type: "global-color", group: "warning" },
    "400": { value: "#542b18", type: "global-color", group: "warning" },
    "500": { value: "#af5122", type: "global-color", group: "warning" },
    "600": { value: "#c46233", type: "global-color", group: "warning" },
    "700": { value: "#de753c", type: "global-color", group: "warning" },
    "800": { value: "#e78040", type: "global-color", group: "warning" },
    "900": { value: "#ed974b", type: "global-color", group: "warning" },
    "1000": { value: "#f5bf6d", type: "global-color", group: "warning" },
  },
  danger: {
    "100": { value: "#410409", type: "global-color", group: "danger" },
    "200": { value: "#490b10", type: "global-color", group: "danger" },
    "300": { value: "#521517", type: "global-color", group: "danger" },
    "400": { value: "#5f2021", type: "global-color", group: "danger" },
    "500": { value: "#c8343f", type: "global-color", group: "danger" },
    "600": { value: "#dd4a50", type: "global-color", group: "danger" },
    "700": { value: "#eb6772", type: "global-color", group: "danger" },
    "800": { value: "#ee7685", type: "global-color", group: "danger" },
    "900": { value: "#f28ea2", type: "global-color", group: "danger" },
    "1000": { value: "#f6b7cd", type: "global-color", group: "danger" },
  },
  /* Info is currently just a copy of brandThree */
  info: {
    "100": { value: "#071e2d", type: "global-color", group: "info" },
    "200": { value: "#0d2534", type: "global-color", group: "info" },
    "300": { value: "#122d3e", type: "global-color", group: "info" },
    "400": { value: "#19394c", type: "global-color", group: "info" },
    "500": { value: "#43718d", type: "global-color", group: "info" },
    "600": { value: "#5a839b", type: "global-color", group: "info" },
    "700": { value: "#7396ab", type: "global-color", group: "info" },
    "800": { value: "#7f9fb3", type: "global-color", group: "info" },
    "900": { value: "#93afc0", type: "global-color", group: "info" },
    "1000": { value: "#b7cbd7", type: "global-color", group: "info" },
  },
  "brand-magenta": {
    "100": { value: "#321220", type: "global-color", group: "brand-magenta" },
    "200": { value: "#3a1827", type: "global-color", group: "brand-magenta" },
    "300": { value: "#42202e", type: "global-color", group: "brand-magenta" },
    "400": { value: "#4e2a39", type: "global-color", group: "brand-magenta" },
    "500": { value: "#a35276", type: "global-color", group: "brand-magenta" },
    "600": { value: "#b06886", type: "global-color", group: "brand-magenta" },
    "700": { value: "#be7f99", type: "global-color", group: "brand-magenta" },
    "800": { value: "#c58aa2", type: "global-color", group: "brand-magenta" },
    "900": { value: "#cf9eb1", type: "global-color", group: "brand-magenta" },
    "1000": { value: "#e1c0cc", type: "global-color", group: "brand-magenta" },
  },
  "brand-beige": {
    "100": { value: "#2d160e", type: "global-color", group: "brand-beige" },
    "200": { value: "#351d15", type: "global-color", group: "brand-beige" },
    "300": { value: "#3d241c", type: "global-color", group: "brand-beige" },
    "400": { value: "#493027", type: "global-color", group: "brand-beige" },
    "500": { value: "#975e4a", type: "global-color", group: "brand-beige" },
    "600": { value: "#ab6f5b", type: "global-color", group: "brand-beige" },
    "700": { value: "#c0836e", type: "global-color", group: "brand-beige" },
    "800": { value: "#c78e79", type: "global-color", group: "brand-beige" },
    "900": { value: "#d1a08c", type: "global-color", group: "brand-beige" },
    "1000": { value: "#e3c2b1", type: "global-color", group: "brand-beige" },
  },
  "brand-blue": {
    "100": { value: "#071e2d", type: "global-color", group: "brand-blue" },
    "200": { value: "#0d2534", type: "global-color", group: "brand-blue" },
    "300": { value: "#122d3e", type: "global-color", group: "brand-blue" },
    "400": { value: "#19394c", type: "global-color", group: "brand-blue" },
    "500": { value: "#43718d", type: "global-color", group: "brand-blue" },
    "600": { value: "#5a839b", type: "global-color", group: "brand-blue" },
    "700": { value: "#7396ab", type: "global-color", group: "brand-blue" },
    "800": { value: "#7f9fb3", type: "global-color", group: "brand-blue" },
    "900": { value: "#93afc0", type: "global-color", group: "brand-blue" },
    "1000": { value: "#b7cbd7", type: "global-color", group: "brand-blue" },
  },
  "meta-purple": {
    "100": { value: "#221a2c", type: "global-color", group: "meta-purple" },
    "200": { value: "#272032", type: "global-color", group: "meta-purple" },
    "300": { value: "#2f273a", type: "global-color", group: "meta-purple" },
    "400": { value: "#3a3245", type: "global-color", group: "meta-purple" },
    "500": { value: "#776491", type: "global-color", group: "meta-purple" },
    "600": { value: "#8876a1", type: "global-color", group: "meta-purple" },
    "700": { value: "#9b8bb0", type: "global-color", group: "meta-purple" },
    "800": { value: "#a495b7", type: "global-color", group: "meta-purple" },
    "900": { value: "#b2a7c3", type: "global-color", group: "meta-purple" },
    "1000": { value: "#cdc5d9", type: "global-color", group: "meta-purple" },
  },
  "meta-lime": {
    "100": { value: "#1c1f00", type: "global-color", group: "meta-lime" },
    "200": { value: "#222500", type: "global-color", group: "meta-lime" },
    "300": { value: "#292d00", type: "global-color", group: "meta-lime" },
    "400": { value: "#343900", type: "global-color", group: "meta-lime" },
    "500": { value: "#6a7200", type: "global-color", group: "meta-lime" },
    "600": { value: "#7c8400", type: "global-color", group: "meta-lime" },
    "700": { value: "#8f9800", type: "global-color", group: "meta-lime" },
    "800": { value: "#99a200", type: "global-color", group: "meta-lime" },
    "900": { value: "#a9b325", type: "global-color", group: "meta-lime" },
    "1000": { value: "#c5d14c", type: "global-color", group: "meta-lime" },
  },
} as const;
