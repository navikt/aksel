import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const warningSemanticTokenConfig = {
  bg: {
    "warning-soft": {
      value: "{ax.warning.100.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "warning-softA": {
      value: "{ax.warning.100A.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "warning-moderate": {
      value: "{ax.warning.200.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border (f.eks. alert warning).",
    },
    "warning-moderateA": {
      value: "{ax.warning.200A.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "warning-moderate-hover": {
      value: "{ax.warning.300.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "warning-moderate-hoverA": {
      value: "{ax.warning.300A.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "warning-moderate-pressed": {
      value: "{ax.warning.400.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "warning-moderate-pressedA": {
      value: "{ax.warning.400A.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "warning-strong": {
      value: "{ax.warning.600.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "warning-strong-hover": {
      value: "{ax.warning.700.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "warning-strong-pressed": {
      value: "{ax.warning.800.value}",
      type: "color",
      group: "background.warning",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    warning: {
      value: "{ax.warning.1000.value}",
      type: "color",
      group: "text.warning",
      comment:
        "Sterk farge for tekst og ikoner for rollen warning. Godkjent på alle bakgrunner unntatt strong.",
    },
    "warning-subtle": {
      value: "{ax.warning.800.value}",
      type: "color",
      group: "text.warning",
      comment:
        "Standard farge for tekst og ikoner med rollen warning. Godkjent på alle bakgrunner unntatt strong.",
    },
    "warning-decoration": {
      value: "{ax.warning.600.value}",
      type: "color",
      group: "text.warning",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "warning-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.warning",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    warning: {
      value: "{ax.warning.600.value}",
      type: "color",
      group: "border.warning",
      comment: "Standard farge for border.",
    },
    "warning-subtle": {
      value: "{ax.warning.400.value}",
      type: "color",
      group: "border.warning",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "warning-subtleA": {
      value: "{ax.warning.400A.value}",
      type: "color",
      group: "border.warning",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "warning-strong": {
      value: "{ax.warning.700.value}",
      type: "color",
      group: "border.warning",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
