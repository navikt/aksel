import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const brandBeigeSemanticTokenConfig = {
  bg: {
    "brand-beige-soft": {
      value: "{ax.brand-beige.100.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "brand-beige-softA": {
      value: "{ax.brand-beige.100A.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "brand-beige-moderate": {
      value: "{ax.brand-beige.200.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "brand-beige-moderateA": {
      value: "{ax.brand-beige.200A.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-beige-moderate-hover": {
      value: "{ax.brand-beige.300.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-beige-moderate-hoverA": {
      value: "{ax.brand-beige.300A.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-beige-moderate-pressed": {
      value: "{ax.brand-beige.400.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-beige-moderate-pressedA": {
      value: "{ax.brand-beige.400A.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-beige-strong": {
      value: "{ax.brand-beige.600.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "brand-beige-strong-hover": {
      value: "{ax.brand-beige.700.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "brand-beige-strong-pressed": {
      value: "{ax.brand-beige.800.value}",
      type: "color",
      group: "background.brand-beige",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    "brand-beige": {
      value: "{ax.brand-beige.1000.value}",
      type: "color",
      group: "text.brand-beige",
      comment:
        "Sterk farge for tekst og ikoner for rollen brand beige. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-beige-subtle": {
      value: "{ax.brand-beige.800.value}",
      type: "color",
      group: "text.brand-beige",
      comment:
        "Standard farge for tekst og ikoner med rollen brand beige. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-beige-decoration": {
      value: "{ax.brand-beige.600.value}",
      type: "color",
      group: "text.brand-beige",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "brand-beige-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-beige",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    "brand-beige": {
      value: "{ax.brand-beige.600.value}",
      type: "color",
      group: "border.brand-beige",
      comment: "Standard farge for border.",
    },
    "brand-beige-subtle": {
      value: "{ax.brand-beige.400.value}",
      type: "color",
      group: "border.brand-beige",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "brand-beige-subtleA": {
      value: "{ax.brand-beige.400A.value}",
      type: "color",
      group: "border.brand-beige",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "brand-beige-strong": {
      value: "{ax.brand-beige.700.value}",
      type: "color",
      group: "border.brand-beige",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
