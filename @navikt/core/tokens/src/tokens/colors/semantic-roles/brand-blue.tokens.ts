import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const brandBlueSemanticTokenConfig = {
  bg: {
    "brand-blue-soft": {
      value: "{ax.brand-blue.100.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "brand-blue-softA": {
      value: "{ax.brand-blue.100A.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "brand-blue-moderate": {
      value: "{ax.brand-blue.200.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "brand-blue-moderateA": {
      value: "{ax.brand-blue.200A.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-blue-moderate-hover": {
      value: "{ax.brand-blue.300.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-blue-moderate-hoverA": {
      value: "{ax.brand-blue.300A.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-blue-moderate-pressed": {
      value: "{ax.brand-blue.400.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "brand-blue-moderate-pressedA": {
      value: "{ax.brand-blue.400A.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "brand-blue-strong": {
      value: "{ax.brand-blue.600.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "brand-blue-strong-hover": {
      value: "{ax.brand-blue.700.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "brand-blue-strong-pressed": {
      value: "{ax.brand-blue.800.value}",
      type: "color",
      group: "background.brand-blue",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    "brand-blue": {
      value: "{ax.brand-blue.1000.value}",
      type: "color",
      group: "text.brand-blue",
      comment:
        "Sterk farge for tekst og ikoner for rollen brand blue. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-blue-subtle": {
      value: "{ax.brand-blue.800.value}",
      type: "color",
      group: "text.brand-blue",
      comment:
        "Standard farge for tekst og ikoner med rollen brand blue. Godkjent på alle bakgrunner unntatt strong.",
    },
    "brand-blue-decoration": {
      value: "{ax.brand-blue.600.value}",
      type: "color",
      group: "text.brand-blue",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "brand-blue-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-blue",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    "brand-blue": {
      value: "{ax.brand-blue.600.value}",
      type: "color",
      group: "border.brand-blue",
      comment: "Standard farge for border.",
    },
    "brand-blue-subtle": {
      value: "{ax.brand-blue.400.value}",
      type: "color",
      group: "border.brand-blue",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "brand-blue-subtleA": {
      value: "{ax.brand-blue.400A.value}",
      type: "color",
      group: "border.brand-blue",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "brand-blue-strong": {
      value: "{ax.brand-blue.700.value}",
      type: "color",
      group: "border.brand-blue",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
