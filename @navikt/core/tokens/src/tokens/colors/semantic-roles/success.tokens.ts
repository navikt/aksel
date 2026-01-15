import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const successSemanticTokenConfig = {
  bg: {
    "success-soft": {
      value: "{ax.success.100.value}",
      type: "color",
      group: "background.success",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "success-softA": {
      value: "{ax.success.100A.value}",
      type: "color",
      group: "background.success",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "success-moderate": {
      value: "{ax.success.200.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border (f.eks. alert success).",
    },
    "success-moderateA": {
      value: "{ax.success.200A.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "success-moderate-hover": {
      value: "{ax.success.300.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "success-moderate-hoverA": {
      value: "{ax.success.300A.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "success-moderate-pressed": {
      value: "{ax.success.400.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "success-moderate-pressedA": {
      value: "{ax.success.400A.value}",
      type: "color",
      group: "background.success",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "success-strong": {
      value: "{ax.success.600.value}",
      type: "color",
      group: "background.success",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "success-strong-hover": {
      value: "{ax.success.700.value}",
      type: "color",
      group: "background.success",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "success-strong-pressed": {
      value: "{ax.success.800.value}",
      type: "color",
      group: "background.success",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    success: {
      value: "{ax.success.1000.value}",
      type: "color",
      group: "text.success",
      comment:
        "Sterk farge for tekst og ikoner for rollen success. Godkjent på alle bakgrunner unntatt strong.",
    },
    "success-subtle": {
      value: "{ax.success.800.value}",
      type: "color",
      group: "text.success",
      comment:
        "Standard farge for tekst og ikoner med rollen success. Godkjent på alle bakgrunner unntatt strong.",
    },
    "success-decoration": {
      value: "{ax.success.600.value}",
      type: "color",
      group: "text.success",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "success-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.success",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    success: {
      value: "{ax.success.600.value}",
      type: "color",
      group: "border.success",
      comment: "Standard farge for border.",
    },
    "success-subtle": {
      value: "{ax.success.400.value}",
      type: "color",
      group: "border.success",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "success-subtleA": {
      value: "{ax.success.400A.value}",
      type: "color",
      group: "border.success",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "success-strong": {
      value: "{ax.success.700.value}",
      type: "color",
      group: "border.success",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
