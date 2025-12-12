import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const brandMagentaSemanticTokenConfig = {
  bg: {
    "brand-magenta-soft": {
      value: "{ax.brand-magenta.100.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "brand-magenta-softA": {
      value: "{ax.brand-magenta.100A.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "brand-magenta-moderate": {
      value: "{ax.brand-magenta.200.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "brand-magenta-moderateA": {
      value: "{ax.brand-magenta.200A.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-magenta-moderate-hover": {
      value: "{ax.brand-magenta.300.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-magenta-moderate-hoverA": {
      value: "{ax.brand-magenta.300A.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-magenta-moderate-pressed": {
      value: "{ax.brand-magenta.400.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-magenta-moderate-pressedA": {
      value: "{ax.brand-magenta.400A.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-magenta-strong": {
      value: "{ax.brand-magenta.600.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "brand-magenta-strong-hover": {
      value: "{ax.brand-magenta.700.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "brand-magenta-strong-pressed": {
      value: "{ax.brand-magenta.800.value}",
      type: "color",
      group: "background.brand-magenta",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    "brand-magenta": {
      value: "{ax.brand-magenta.1000.value}",
      type: "color",
      group: "text.brand-magenta",
      comment:
        "Sterk farge for tekst og ikoner for rollen brand magenta. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-magenta-subtle": {
      value: "{ax.brand-magenta.800.value}",
      type: "color",
      group: "text.brand-magenta",
      comment:
        "Standard farge for tekst og ikoner med rollen brand magenta. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-magenta-decoration": {
      value: "{ax.brand-magenta.600.value}",
      type: "color",
      group: "text.brand-magenta",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "brand-magenta-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-magenta",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    "brand-magenta": {
      value: "{ax.brand-magenta.600.value}",
      type: "color",
      group: "border.brand-magenta",
      comment: "Standard farge for border.",
    },
    "brand-magenta-subtle": {
      value: "{ax.brand-magenta.400.value}",
      type: "color",
      group: "border.brand-magenta",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "brand-magenta-subtleA": {
      value: "{ax.brand-magenta.400A.value}",
      type: "color",
      group: "border.brand-magenta",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "brand-magenta-strong": {
      value: "{ax.brand-magenta.700.value}",
      type: "color",
      group: "border.brand-magenta",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
