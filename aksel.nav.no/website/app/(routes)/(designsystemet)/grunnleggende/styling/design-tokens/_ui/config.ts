import { AkselColorRole } from "@navikt/ds-tokens/types";

export type RoleT<T> = {
  id: T;
  title: string;
  description: string;
};

export type RootRoleT = RoleT<"root">;

export type ColorRoleT = RoleT<AkselColorRole> | RootRoleT;

export type FontRoleT = RoleT<"family" | "line-height" | "size" | "weight">;

export type BreakpointRoleT = RoleT<"mobile first" | "desktop first">;

export type ColorCategoryT = {
  id: "backgroundColor" | "borderColor" | "textColor";
  title: string;
  description: string;
  roles?: ColorRoleT;
};

export type FontCategoryT = {
  id: "font";
  title: string;
  description: string;
  roles?: FontRoleT;
};

export type BreakpointCategoryT = {
  id: "breakpoint";
  title: string;
  description: string;
  roles?: BreakpointRoleT;
};

export type TokenCategoryT = {
  id:
    | ColorCategoryT["id"]
    | FontCategoryT["id"]
    | BreakpointCategoryT["id"]
    | "shadow"
    | "space"
    | "radius";
  title: string;
  description: string;
  roles?: ColorRoleT[] | FontRoleT[] | BreakpointRoleT[];
};

const COLOR_ROLES: ColorRoleT[] = [
  {
    id: "root",
    title: "Root",
    description:
      "Root-tokens er spissede farger som løser spesifikke behov i et grensesnitt.",
  },
  {
    id: "neutral",
    title: "Neutral",
    description:
      "Neutral brukes på elementer som ikke skal stikke seg ut eller har et bestemt budskap.",
  },
  {
    id: "accent",
    title: "Accent",
    description: "Accent brukes som standard farge på interaktive elementer.",
  },
  {
    id: "success",
    title: "Success",
    description:
      "Success brukes på elementer som har en positiv interaksjon eller budskap.",
  },
  {
    id: "warning",
    title: "Warning",
    description: "Warning brukes på elementer som kommuniserer advarsel.",
  },
  {
    id: "danger",
    title: "Danger",
    description:
      "Danger brukes på elementer som har en destruktiv interaksjon eller kommuniserer at noe gikk galt.",
  },
  {
    id: "info",
    title: "Info",
    description:
      "Info brukes på elementer som har informerer eller gir opplysning.",
  },
  {
    id: "brand-magenta",
    title: "Brand magenta",
    description:
      "Brand Magenta er den primære brand-fargen. Brukes sparsommelig.",
  },
  {
    id: "brand-beige",
    title: "Brand beige",
    description:
      "Brand Beige er den sekundære brand-fargen. Brukes sparsommelig.",
  },
  {
    id: "brand-blue",
    title: "Brand blue",
    description:
      "Brand Blue er den tertiære brand-fargen. Kan brukes mer enn de andre brand-fargene.",
  },
  {
    id: "meta-lime",
    title: "Meta lime",
    description:
      "Meta Lime brukes gjerne på metadata. Team definerer selv hva fargen kommuniserer.",
  },
  {
    id: "meta-purple",
    title: "Meta purple",
    description:
      "Meta Purple brukes gjerne på metadata. Team definerer selv hva fargen kommuniserer.",
  },
];

const FONT_ROLES: FontRoleT[] = [
  {
    id: "family",
    title: "Family",
    description: "Fonten som brukes i fontstilene.",
  },
  {
    id: "line-height",
    title: "Line height",
    description: "Linjehøyder som brukes i fontstilene.",
  },
  {
    id: "size",
    title: "Size",
    description: "Tekststørrelser som brukes i fontstilene.",
  },
  {
    id: "weight",
    title: "Weight",
    description: "Fontvekter som brukes i fontstilene.",
  },
];

const BREAKPOINT_ROLES: BreakpointRoleT[] = [
  {
    id: "mobile first",
    title: "Mobile first",
    description: "Brekkpunkter som tar utgangspunkt i mobil først.",
  },
  {
    id: "desktop first",
    title: "Desktop first",
    description: "Brekkpunkter som tar utgangspunkt i desktop først.",
  },
];

const TOKEN_CATEGORIES: TokenCategoryT[] = [
  {
    id: "backgroundColor",
    title: "Bakgrunnsfarger",
    description: "Farge på bakgrunner.",
    roles: COLOR_ROLES,
  },
  {
    id: "borderColor",
    title: "Kantlinjefarger",
    description: "Farge på border/stroke.",
    roles: COLOR_ROLES,
  },
  {
    id: "textColor",
    title: "Tekstfarger",
    description: "Farge på tekst og ikoner.",
    roles: COLOR_ROLES,
  },
  {
    id: "shadow",
    title: "Skygger",
    description:
      "Skyggestil som brukes på svevende elementer (popovers og modaler).",
  },
  {
    id: "space",
    title: "Avstander",
    description: "Avstander som brukes til padding, margin og gap.",
  },
  {
    id: "radius",
    title: "Radiuser",
    description: "Hjørneavrundinger som brukes på elementer.",
  },
  {
    id: "font",
    title: "Fontstiler",
    description: "Byggeklossene til fontstilene.",
    roles: FONT_ROLES,
  },
  {
    id: "breakpoint",
    title: "Brekkpunkter",
    description:
      "Skjermbreddeverdier som kan utløse endring i layout og innhold.",
    roles: BREAKPOINT_ROLES,
  },
];

export { TOKEN_CATEGORIES, COLOR_ROLES, FONT_ROLES, BREAKPOINT_ROLES };
