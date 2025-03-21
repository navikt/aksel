import { type SemanticColorRoles } from "@navikt/ds-tokens/types";

export type ColorRolesT = Record<
  SemanticColorRoles,
  {
    title: string;
    description: string;
  }
>;

export type FontRolesT = Record<
  "family" | "line-height" | "size" | "weight",
  {
    title: string;
    description: string;
  }
>;

export type BreakpointRolesT = Record<
  "mobile first" | "desktop first",
  {
    title: string;
    description: string;
  }
>;

export type ColorCategoriesT = Record<
  "backgroundColor" | "borderColor" | "textColor",
  {
    title: string;
    description: string;
    roles?: ColorRolesT;
  }
>;

export type FontCategoriesT = Record<
  "font",
  {
    title: string;
    description: string;
    roles?: FontRolesT;
  }
>;

export type BreakpointCategoriesT = Record<
  "breakpoint",
  {
    title: string;
    description: string;
    roles?: BreakpointRolesT;
  }
>;

export type TokenCategoriesT = ColorCategoriesT &
  FontCategoriesT &
  BreakpointCategoriesT &
  Record<
    "shadow" | "space" | "radius",
    {
      title: string;
      description: string;
    }
  >;

const COLOR_ROLES: ColorRolesT = {
  neutral: {
    title: "Neutral",
    description: "TODO: Sjur fyller ut",
  },
  accent: {
    title: "Accent",
    description: "TODO: Sjur fyller ut",
  },
  success: {
    title: "Success",
    description: "TODO: Sjur fyller ut",
  },
  warning: {
    title: "Warning",
    description: "TODO: Sjur fyller ut",
  },
  danger: {
    title: "Danger",
    description: "TODO: Sjur fyller ut",
  },
  info: {
    title: "Info",
    description: "TODO: Sjur fyller ut",
  },
  "brand-magenta": {
    title: "Brand magenta",
    description: "TODO: Sjur fyller ut",
  },
  "brand-beige": {
    title: "Brand beige",
    description: "TODO: Sjur fyller ut",
  },
  "brand-blue": {
    title: "Brand blue",
    description: "TODO: Sjur fyller ut",
  },
  "meta-lime": {
    title: "Meta lime",
    description: "TODO: Sjur fyller ut",
  },
  "meta-purple": {
    title: "Meta purple",
    description: "TODO: Sjur fyller ut",
  },
};

const FONT_ROLES: FontRolesT = {
  family: {
    title: "Family",
    description: "TODO: Sjur fyller ut",
  },
  "line-height": {
    title: "Line height",
    description: "TODO: Sjur fyller ut",
  },
  size: {
    title: "Size",
    description: "TODO: Sjur fyller ut",
  },
  weight: {
    title: "Weight",
    description: "TODO: Sjur fyller ut",
  },
};

const BREAKPOINT_ROLES: BreakpointRolesT = {
  "mobile first": {
    title: "Mobile first",
    description: "TODO: Sjur fyller ut",
  },
  "desktop first": {
    title: "Desktop first",
    description: "TODO: Sjur fyller ut",
  },
};

const TOKEN_CATEGORIES: TokenCategoriesT = {
  backgroundColor: {
    title: "Background colors",
    description: "TODO: Sjur fyller ut",
    roles: COLOR_ROLES,
  },
  borderColor: {
    title: "Border colors",
    description: "TODO: Sjur fyller ut",
    roles: COLOR_ROLES,
  },
  textColor: {
    title: "Text colors",
    description: "TODO: Sjur fyller ut",
    roles: COLOR_ROLES,
  },
  shadow: {
    title: "Shadows",
    description: "TODO: Sjur fyller ut",
  },
  space: {
    title: "Spacing",
    description: "TODO: Sjur fyller ut",
  },
  radius: {
    title: "Radius",
    description: "TODO: Sjur fyller ut",
  },
  font: {
    title: "Fonts",
    description: "TODO: Sjur fyller ut",
    roles: FONT_ROLES,
  },
  breakpoint: {
    title: "Breakpoints",
    description: "TODO: Sjur fyller ut",
    roles: BREAKPOINT_ROLES,
  },
};

export { TOKEN_CATEGORIES, COLOR_ROLES, FONT_ROLES, BREAKPOINT_ROLES };
