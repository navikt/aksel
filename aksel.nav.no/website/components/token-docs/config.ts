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
    description:
      "Neutral brukes på elementer som ikke skal stikke seg ut eller har et bestemt budskap.",
  },
  accent: {
    title: "Accent",
    description: "Accent brukes som standard farge på interaktive elementer.",
  },
  success: {
    title: "Success",
    description:
      "Success brukes på elementer som har en positiv interaksjon eller budskap.",
  },
  warning: {
    title: "Warning",
    description: "Warning brukes på elementer som kommuniserer advarsel.",
  },
  danger: {
    title: "Danger",
    description:
      "Danger brukes på elementer som har en destruktiv interaksjon eller kommuniserer at noe gikk galt.",
  },
  info: {
    title: "Info",
    description:
      "Info brukes på elementer som har informerer eller gir opplysning.",
  },
  "brand-magenta": {
    title: "Brand magenta",
    description:
      "Brand Magenta er den primære brand-fargen. Brukes sparsommelig.",
  },
  "brand-beige": {
    title: "Brand beige",
    description:
      "Brand Beige er den sekundære brand-fargen. Brukes sparsommelig.",
  },
  "brand-blue": {
    title: "Brand blue",
    description:
      "Brand Blue er den tertiære brand-fargen. Kan brukes mer enn de andre brand-fargene.",
  },
  "meta-lime": {
    title: "Meta lime",
    description:
      "Meta Lime brukes gjerne på metadata. Team definerer selv hva fargen kommuniserer.",
  },
  "meta-purple": {
    title: "Meta purple",
    description:
      "TODO: Meta Purple brukes gjerne på metadata. Team definerer selv hva fargen kommuniserer.",
  },
};

const FONT_ROLES: FontRolesT = {
  family: {
    title: "Family",
    description: "Fonten som brukes i fontstilene.",
  },
  "line-height": {
    title: "Line height",
    description: "Linjehøyder som brukes i fontstilene.",
  },
  size: {
    title: "Size",
    description: "Tekststørrelser som brukes i fontstilene.",
  },
  weight: {
    title: "Weight",
    description: "Fontvekter som brukes i fontstilene.",
  },
};

const BREAKPOINT_ROLES: BreakpointRolesT = {
  "mobile first": {
    title: "Mobile first",
    description: "Brekkpunkter som tar utgangspunkt i mobil først.",
  },
  "desktop first": {
    title: "Desktop first",
    description: "Brekkpunkter som tar utgangspunkt i desktop først.",
  },
};

const TOKEN_CATEGORIES: TokenCategoriesT = {
  backgroundColor: {
    title: "Background colors",
    description: "Farge på bakgrunner.",
    roles: COLOR_ROLES,
  },
  borderColor: {
    title: "Border colors",
    description: "Farge på border/stroke.",
    roles: COLOR_ROLES,
  },
  textColor: {
    title: "Text colors",
    description: "Farge på tekst og ikoner.",
    roles: COLOR_ROLES,
  },
  shadow: {
    title: "Shadows",
    description:
      "Skyggestil som brukes på svevende elementer (popovers og modaler).",
  },
  space: {
    title: "Spacing",
    description: "Avstander som brukes til padding, margin og gap.",
  },
  radius: {
    title: "Radius",
    description: "Hjørneavrundinger som brukes på elementer.",
  },
  font: {
    title: "Fonts",
    description: "Byggeklossene til fonstilene.",
    roles: FONT_ROLES,
  },
  breakpoint: {
    title: "Breakpoints",
    description:
      "Skjermbreddeverdier som kan utløse endring i layout og innhold.",
    roles: BREAKPOINT_ROLES,
  },
};

export { TOKEN_CATEGORIES, COLOR_ROLES, FONT_ROLES, BREAKPOINT_ROLES };
